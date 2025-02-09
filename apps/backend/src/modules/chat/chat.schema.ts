export const sendMessage = {
  type: "object",
  properties: {
    roomId: { type: "number" },
    userId: { type: "number" },
    message: { type: "string" },
  },
  required: ["roomId", "userId", "message"],
}

export const schemas = { sendMessage }
