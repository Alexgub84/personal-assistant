import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";
import { createChatModel, createHumanMessage, processMessage } from "../src/index";

// Mock the OpenAI API to avoid actual API calls in unit tests
jest.mock("@langchain/openai");

describe("Personal Assistant Unit Tests", () => {
  let mockModel: jest.Mocked<ChatOpenAI>;

  beforeEach(() => {
    mockModel = {
      invoke: jest.fn(),
    } as any;
    
    (ChatOpenAI as jest.MockedClass<typeof ChatOpenAI>).mockImplementation(() => mockModel);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createChatModel", () => {
    test("should create ChatOpenAI instance with default configuration", () => {
      // Mock process.env to avoid reading actual API key
      const originalEnv = process.env.OPENAI_API_KEY;
      process.env.OPENAI_API_KEY = "test-env-key";
      
      const model = createChatModel();
      
      expect(ChatOpenAI).toHaveBeenCalledWith({
        modelName: "gpt-4o",
        temperature: 0.7,
        openAIApiKey: "test-env-key",
      });
      
      // Restore original env
      process.env.OPENAI_API_KEY = originalEnv;
    });

    test("should create ChatOpenAI instance with custom API key", () => {
      const customApiKey = "custom-test-key";
      const model = createChatModel(customApiKey);
      
      expect(ChatOpenAI).toHaveBeenCalledWith({
        modelName: "gpt-4o",
        temperature: 0.7,
        openAIApiKey: customApiKey,
      });
    });
  });

  describe("createHumanMessage", () => {
    test("should create HumanMessage with correct content", () => {
      const content = "Hello, AI!";
      const message = createHumanMessage(content);
      
      expect(message.content).toBe(content);
      expect(message._getType()).toBe("human");
    });

    test("should handle empty message content", () => {
      const message = createHumanMessage("");
      
      expect(message.content).toBe("");
      expect(message._getType()).toBe("human");
    });
  });

  describe("processMessage", () => {
    test("should process message and return response content", async () => {
      const mockResponse = {
        content: "AI was first coined in 1956 at Dartmouth College!",
      } as any;

      mockModel.invoke.mockResolvedValue(mockResponse);

      const message = createHumanMessage("Tell me a fun fact about AI");
      const response = await processMessage(mockModel, message);

      expect(mockModel.invoke).toHaveBeenCalledWith([message]);
      expect(response).toBe("AI was first coined in 1956 at Dartmouth College!");
    });

    test("should handle errors during message processing", async () => {
      const error = new Error("API Error");
      mockModel.invoke.mockRejectedValue(error);

      const message = createHumanMessage("Test message");
      
      await expect(processMessage(mockModel, message)).rejects.toThrow("API Error");
    });

    test("should handle empty response content", async () => {
      const mockResponse = {
        content: "",
      } as any;

      mockModel.invoke.mockResolvedValue(mockResponse);

      const message = createHumanMessage("Test message");
      const response = await processMessage(mockModel, message);

      expect(response).toBe("");
    });
  });
});
