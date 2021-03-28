import Result from './result';

export default interface Message {
    action: string;
    timestamp: number;
    command: string;
    result: Result[] | string;
    error: boolean;
}