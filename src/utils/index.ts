import { IUser } from "@/interfaces";
import { formatDistance } from "date-fns";
import { pt } from "date-fns/locale/pt";

const date = new Date();
const MAXLENGTH = 100;
const lastData = [1, 2, 3, 3, 2, 1, 2, 2, 1, 4, 3, 2, 4, 3, 2];

function messegeDate(datePosted: typeof date, dateNow: typeof date) {
  const dateResult = formatDistance(datePosted, dateNow, {
    addSuffix: true,
    locale: pt,
  });
  return { dateResult };
}

function showNameOfUser(user: null | IUser) {
  if (!user) return false;
  return {
    username: user.username,
    photoUrl: user.profile?.photo.url || null,
  };
}

function extractTextFromHTML(html: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

export {
  extractTextFromHTML,
  messegeDate,
  MAXLENGTH,
  lastData,
  showNameOfUser,
};
