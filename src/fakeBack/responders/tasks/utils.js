import { LoremIpsum } from "lorem-ipsum";
import { subDays, addDays } from "date-fns";

const lorem = new LoremIpsum({
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

export const generateTask = (id) => ({
  isFinished: false,
  validUntil: addDays(subDays(new Date(), 2), Math.floor(Math.random() * 6)),
  description: lorem.generateSentences(1),
  ...(id ? { id } : {}),
});
