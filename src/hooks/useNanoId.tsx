import { customAlphabet } from 'nanoid';
const nanoid = customAlphabet('1234567890abcdef', 10);

export const useNanoId = ({ prefix }: { prefix?: string }) => {
  const id = nanoid();

  return prefix ? `${prefix}-${id}` : id;
};
