// MongoDB Initialization Script
// This script initializes the databases and collections for chat and activity logs

db = db.getSiblingDB("pawhome_chat");

// ============================================
// CHAT COLLECTIONS
// ============================================

// Chat Rooms Collection
db.createCollection("chat_rooms", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["match_id", "participants", "created_at"],
            properties: {
                match_id: {
                    bsonType: "string",
                    description: "UUID of the match from PostgreSQL",
                },
                participants: {
                    bsonType: "array",
                    description: "Array of participant user IDs",
                    items: {
                        bsonType: "object",
                        required: ["user_id", "role"],
                        properties: {
                            user_id: { bsonType: "string" },
                            role: { enum: ["adopter", "owner"] },
                            last_read_at: { bsonType: "date" },
                            notifications_enabled: { bsonType: "bool" },
                        },
                    },
                },
                pet_id: {
                    bsonType: "string",
                    description: "UUID of the pet being discussed",
                },
                is_active: {
                    bsonType: "bool",
                    description: "Whether the chat is still active",
                },
                blocked: {
                    bsonType: "bool",
                    description: "Whether the chat has been blocked",
                },
                blocked_by: {
                    bsonType: "string",
                    description: "User ID who blocked the chat",
                },
                metadata: {
                    bsonType: "object",
                    description: "Additional metadata about the chat",
                },
                created_at: {
                    bsonType: "date",
                    description: "Timestamp when chat was created",
                },
                updated_at: {
                    bsonType: "date",
                    description: "Timestamp when chat was last updated",
                },
            },
        },
    },
});

// Messages Collection
db.createCollection("messages", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: [
                "chat_room_id",
                "sender_id",
                "message_type",
                "created_at",
            ],
            properties: {
                chat_room_id: {
                    bsonType: "string",
                    description: "Reference to chat_rooms collection",
                },
                sender_id: {
                    bsonType: "string",
                    description: "UUID of the user sending the message",
                },
                message_type: {
                    enum: [
                        "text",
                        "image",
                        "video",
                        "audio",
                        "file",
                        "location",
                        "pet_info",
                        "system",
                    ],
                    description: "Type of message content",
                },
                content: {
                    bsonType: "string",
                    description: "Message content (text or reference)",
                },
                media_urls: {
                    bsonType: "array",
                    description: "URLs of any media attachments",
                    items: {
                        bsonType: "object",
                        properties: {
                            url: { bsonType: "string" },
                            type: { enum: ["image", "video", "audio", "file"] },
                            thumbnail_url: { bsonType: "string" },
                            size_bytes: { bsonType: "long" },
                            mime_type: { bsonType: "string" },
                        },
                    },
                },
                reply_to: {
                    bsonType: "objectId",
                    description: "ID of message being replied to",
                },
                metadata: {
                    bsonType: "object",
                    description: "Additional message metadata",
                },
                read_by: {
                    bsonType: "array",
                    description: "Users who have read this message",
                    items: {
                        bsonType: "object",
                        properties: {
                            user_id: { bsonType: "string" },
                            read_at: { bsonType: "date" },
                        },
                    },
                },
                flagged: {
                    bsonType: "bool",
                    description:
                        "Whether message has been flagged for moderation",
                },
                flag_reason: {
                    bsonType: "string",
                    description: "Reason for flagging",
                },
                deleted: {
                    bsonType: "bool",
                    description: "Soft delete flag",
                },
                deleted_at: {
                    bsonType: "date",
                    description: "When message was deleted",
                },
                created_at: {
                    bsonType: "date",
                    description: "Timestamp when message was sent",
                },
                updated_at: {
                    bsonType: "date",
                    description: "Timestamp when message was last edited",
                },
            },
        },
    },
});

// ============================================
// ACTIVITY LOGS COLLECTION
// ============================================

db.createCollection("activity_logs", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["user_id", "action", "timestamp"],
            properties: {
                user_id: {
                    bsonType: "string",
                    description: "UUID of the user performing the action",
                },
                action: {
                    bsonType: "string",
                    description:
                        'Action performed (e.g., "view_pet", "swipe_like", "send_message")',
                },
                entity_type: {
                    bsonType: "string",
                    description:
                        'Type of entity acted upon (e.g., "pet", "user", "match")',
                },
                entity_id: {
                    bsonType: "string",
                    description: "ID of the entity acted upon",
                },
                details: {
                    bsonType: "object",
                    description: "Additional details about the action",
                },
                session_id: {
                    bsonType: "string",
                    description: "Session identifier",
                },
                ip_address: {
                    bsonType: "string",
                    description: "IP address of the user",
                },
                user_agent: {
                    bsonType: "string",
                    description: "User agent string",
                },
                device_info: {
                    bsonType: "object",
                    properties: {
                        device_type: {
                            enum: ["mobile", "tablet", "desktop", "unknown"],
                        },
                        os: { bsonType: "string" },
                        browser: { bsonType: "string" },
                    },
                },
                location: {
                    bsonType: "object",
                    description: "Geographic location",
                    properties: {
                        type: { enum: ["Point"] },
                        coordinates: {
                            bsonType: "array",
                            items: { bsonType: "double" },
                        },
                    },
                },
                timestamp: {
                    bsonType: "date",
                    description: "Timestamp of the action",
                },
            },
        },
    },
});

// ============================================
// USER SESSIONS COLLECTION
// ============================================

db.createCollection("user_sessions", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["user_id", "session_id", "created_at"],
            properties: {
                user_id: {
                    bsonType: "string",
                    description: "UUID of the user",
                },
                session_id: {
                    bsonType: "string",
                    description: "Unique session identifier",
                },
                device_info: {
                    bsonType: "object",
                    properties: {
                        device_id: { bsonType: "string" },
                        device_type: { enum: ["mobile", "tablet", "desktop"] },
                        os: { bsonType: "string" },
                        os_version: { bsonType: "string" },
                        app_version: { bsonType: "string" },
                    },
                },
                fcm_token: {
                    bsonType: "string",
                    description:
                        "Firebase Cloud Messaging token for push notifications",
                },
                apns_token: {
                    bsonType: "string",
                    description: "Apple Push Notification Service token",
                },
                is_active: {
                    bsonType: "bool",
                    description: "Whether session is currently active",
                },
                last_activity_at: {
                    bsonType: "date",
                    description: "Timestamp of last activity",
                },
                created_at: {
                    bsonType: "date",
                    description: "Timestamp when session was created",
                },
                expires_at: {
                    bsonType: "date",
                    description: "Timestamp when session expires",
                },
            },
        },
    },
});

// ============================================
// FRAUD DETECTION LOGS
// ============================================

db.createCollection("fraud_logs", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["user_id", "event_type", "risk_score", "timestamp"],
            properties: {
                user_id: {
                    bsonType: "string",
                    description: "UUID of the user",
                },
                event_type: {
                    enum: [
                        "suspicious_listing",
                        "multiple_accounts",
                        "rapid_swipes",
                        "fake_profile",
                        "payment_fraud",
                        "spam_behavior",
                    ],
                    description: "Type of potentially fraudulent event",
                },
                risk_score: {
                    bsonType: "double",
                    description: "Risk score from ML model (0-1)",
                },
                risk_factors: {
                    bsonType: "array",
                    description: "Factors contributing to risk score",
                    items: {
                        bsonType: "object",
                        properties: {
                            factor: { bsonType: "string" },
                            weight: { bsonType: "double" },
                            description: { bsonType: "string" },
                        },
                    },
                },
                entity_id: {
                    bsonType: "string",
                    description: "ID of related entity (pet, listing, etc.)",
                },
                entity_type: {
                    bsonType: "string",
                    description: "Type of entity",
                },
                action_taken: {
                    enum: [
                        "none",
                        "flagged",
                        "suspended",
                        "blocked",
                        "require_verification",
                    ],
                    description: "Action taken in response",
                },
                reviewed: {
                    bsonType: "bool",
                    description: "Whether this has been reviewed by a human",
                },
                reviewed_by: {
                    bsonType: "string",
                    description: "User ID of reviewer",
                },
                review_notes: {
                    bsonType: "string",
                    description: "Notes from human review",
                },
                timestamp: {
                    bsonType: "date",
                    description: "Timestamp of the event",
                },
            },
        },
    },
});

// ============================================
// CREATE INDEXES
// ============================================

// Chat Rooms Indexes
db.chat_rooms.createIndex({ match_id: 1 }, { unique: true });
db.chat_rooms.createIndex({ "participants.user_id": 1 });
db.chat_rooms.createIndex({ is_active: 1 });
db.chat_rooms.createIndex({ created_at: -1 });
db.chat_rooms.createIndex({ updated_at: -1 });

// Messages Indexes
db.messages.createIndex({ chat_room_id: 1, created_at: -1 });
db.messages.createIndex({ sender_id: 1 });
db.messages.createIndex({ message_type: 1 });
db.messages.createIndex({ created_at: -1 });
db.messages.createIndex({ flagged: 1 });
db.messages.createIndex({ deleted: 1 });
// Text search on message content
db.messages.createIndex({ content: "text" });

// Activity Logs Indexes
db.activity_logs.createIndex({ user_id: 1, timestamp: -1 });
db.activity_logs.createIndex({ action: 1 });
db.activity_logs.createIndex({ entity_type: 1, entity_id: 1 });
db.activity_logs.createIndex({ timestamp: -1 });
db.activity_logs.createIndex({ session_id: 1 });
// TTL index - auto-delete logs older than 90 days
db.activity_logs.createIndex({ timestamp: 1 }, { expireAfterSeconds: 7776000 });

// User Sessions Indexes
db.user_sessions.createIndex({ user_id: 1 });
db.user_sessions.createIndex({ session_id: 1 }, { unique: true });
db.user_sessions.createIndex({ is_active: 1 });
db.user_sessions.createIndex({ last_activity_at: -1 });
// TTL index - auto-delete expired sessions
db.user_sessions.createIndex({ expires_at: 1 }, { expireAfterSeconds: 0 });

// Fraud Logs Indexes
db.fraud_logs.createIndex({ user_id: 1, timestamp: -1 });
db.fraud_logs.createIndex({ event_type: 1 });
db.fraud_logs.createIndex({ risk_score: -1 });
db.fraud_logs.createIndex({ reviewed: 1 });
db.fraud_logs.createIndex({ action_taken: 1 });
db.fraud_logs.createIndex({ timestamp: -1 });

// ============================================
// SAMPLE DATA (for development)
// ============================================

print("MongoDB initialization completed successfully!");
print("Created collections:");
print("  - chat_rooms");
print("  - messages");
print("  - activity_logs");
print("  - user_sessions");
print("  - fraud_logs");
print("All indexes created successfully!");
