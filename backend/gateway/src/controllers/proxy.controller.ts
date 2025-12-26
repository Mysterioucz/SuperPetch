import { All, Controller, Req, Res } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";
import { Request, Response } from "express";
import { firstValueFrom } from "rxjs";
import * as FormData from "form-data";
import * as busboy from "busboy";

@Controller()
export class ProxyController {
  private readonly serviceMap: Record<string, string>;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.serviceMap = {
      auth:
        this.configService.get("AUTH_SERVICE_URL") ||
        "http://auth-service:3001",
      users:
        this.configService.get("USER_SERVICE_URL") ||
        "http://user-service:3002",
      pets:
        this.configService.get("PET_SERVICE_URL") || "http://pet-service:3003",
      matching:
        this.configService.get("MATCHING_SERVICE_URL") ||
        "http://matching-service:3004",
      chat:
        this.configService.get("CHAT_SERVICE_URL") ||
        "http://chat-service:3005",
      marketplace:
        this.configService.get("MARKETPLACE_SERVICE_URL") ||
        "http://marketplace-service:3006",
      admin:
        this.configService.get("ADMIN_SERVICE_URL") ||
        "http://admin-service:3007",
    };
  }

  @All("*")
  async proxy(@Req() req: Request, @Res() res: Response) {
    try {
      // Extract the service name from the path (e.g., /api/v1/auth/login -> auth)
      const pathParts = req.path.split("/").filter(Boolean);
      const serviceName = pathParts[2]; // After 'api' and 'v1'

      const targetServiceUrl = this.serviceMap[serviceName];

      if (!targetServiceUrl) {
        return res.status(404).json({
          statusCode: 404,
          message: `Service '${serviceName}' not found`,
          error: "Not Found",
        });
      }

      // Reconstruct the full URL for the target service
      const targetUrl = `${targetServiceUrl}${req.path}${req.url.includes("?") ? req.url.substring(req.url.indexOf("?")) : ""}`;

      // Prepare headers
      const headers = { ...req.headers };
      delete headers.host;

      // Check if this is a multipart request
      const isMultipart = req.headers["content-type"]?.includes(
        "multipart/form-data",
      );

      let requestData;
      let requestHeaders = headers;

      if (isMultipart) {
        // Parse multipart data and reconstruct using FormData
        const form = new FormData();

        await new Promise<void>((resolve, reject) => {
          const bb = busboy({ headers: req.headers as any });

          bb.on("file", (fieldname, file, info) => {
            const { filename, encoding, mimeType } = info;
            const chunks: Buffer[] = [];

            file.on("data", (chunk) => chunks.push(chunk));
            file.on("end", () => {
              const buffer = Buffer.concat(chunks);
              form.append(fieldname, buffer, {
                filename,
                contentType: mimeType,
              });
            });
          });

          bb.on("field", (fieldname, value) => {
            form.append(fieldname, value);
          });

          bb.on("finish", () => resolve());
          bb.on("error", (error) => reject(error));

          req.pipe(bb);
        });

        requestData = form;
        requestHeaders = {
          ...headers,
          ...form.getHeaders(), // Get the correct multipart boundary
        };
        delete requestHeaders["content-length"]; // Let axios calculate it
      } else {
        requestData = req.body;
        delete requestHeaders["content-length"];
      }

      const response = await firstValueFrom(
        this.httpService.request({
          method: req.method,
          url: targetUrl,
          headers: requestHeaders,
          data: requestData,
          maxRedirects: 5,
          maxBodyLength: Infinity,
          maxContentLength: Infinity,
          validateStatus: () => true, // Accept any status code
        }),
      );

      // Forward the response
      res.status(response.status);
      Object.keys(response.headers).forEach((key) => {
        res.setHeader(key, response.headers[key]);
      });
      return res.send(response.data);
    } catch (error: any) {
      console.error("Gateway proxy error:", error.message);
      console.error(error.stack);
      return res.status(502).json({
        statusCode: 502,
        message: "Bad Gateway - Unable to reach backend service",
        error: error.message,
      });
    }
  }
}
