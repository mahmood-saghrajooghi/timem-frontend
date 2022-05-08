import dayjs from "dayjs";
import { TaskType } from "types/TaskTypes";
import { TopicType } from "types/TopicTypes";
import { CurrentSessionTaskType } from "./types";

export const initialTopicsValue: {
  topics: TopicType[];
  currentSessionTasks: CurrentSessionTaskType[];
} = {
  topics: [
    {
      id: "tpk_1",
      title: "First topic",
      tasks: [
        {
          id: "2",
          topicId: "tpk_1",
          title: "test 2",
          desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
          created: new Date(),
          deadline: dayjs(new Date())
            .add(Math.floor(Math.random() * 4), "days")
            .toDate(),
          completed: null,
          estimate: { h: 0, m: 25, s: 0 },
          status: "TODO",
        },
        {
          id: "1",
          topicId: "tpk_1",
          title: "test 1",
          desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
          created: new Date(),
          deadline: dayjs(new Date())
            .add(Math.floor(Math.random() * 4), "days")
            .toDate(),
          completed: null,
          estimate: { h: 0, m: 25, s: 0 },
          status: "TODO",
        },
      ],
    },
  ],
  currentSessionTasks: [],
};