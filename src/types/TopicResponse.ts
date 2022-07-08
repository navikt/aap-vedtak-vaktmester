export interface TopicResponse {
  topic: string;
  key: string;
  value: string; // JSON?
  partition: number;
  offset: number;
  timestamp: number;
}
