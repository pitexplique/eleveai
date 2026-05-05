export type TutorLessonBlock = {
  title: string;
  items: string[];
};

export type TutorLesson = {
  title: string;
  subtitle?: string;
  notionId: string;
  microId?: string | null;
  blocks: TutorLessonBlock[];
};