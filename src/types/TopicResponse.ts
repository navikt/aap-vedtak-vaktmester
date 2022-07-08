export interface TopicResponse {
  topic: string;
  key: string;
  value: string | null;
  partition: number;
  offset: number;
  timestamp: number;
}
