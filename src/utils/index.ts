import { TRole } from "@/@types";
import { IAllUsers, IGetOneUser, IUser } from "@/interfaces";
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

function showEspecialRoute(role: TRole) {
  if (role === "ADMIN") return "admin";
  if (role === "COORDINATOR") return "coordinator";
  if (role === "USER") return "student";

  return "routeNotFound";
}

function showRoleName(role: TRole) {
  if (role === "ADMIN") return "Administrador";
  if (role === "COORDINATOR") return "Cordenador";
  if (role === "USER") return "Estudante";

  return "Usuário não definido";
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

function showButtonSigniOut({ id, role }: IGetOneUser, currentUser: IUser) {
  if (role === currentUser.role && id === currentUser.id) return true;

  return false;
}

function creatorUser(
  admin: IUser | null,
  coordinator: IUser | null,
  student: IUser | null
) {
  if (admin) return admin;
  if (coordinator) return coordinator;
  if (student) return student;
}

function currentUserCanManagerProfile(
  { id, role }: IGetOneUser,
  currentUser: IUser
) {
  if (currentUser.role === "ADMIN") return true;
  if (role === "COORDINATOR" && id === currentUser.id) return true;
  if (role === "USER" && id === currentUser.id) return true;

  return false;
}

function currentUserCanManagerfiles({
  coordinator,
  student,
  currentUser,
}: IAllUsers) {
  if (currentUser.role === "ADMIN") return true;
  if (
    coordinator &&
    currentUser.role === "COORDINATOR" &&
    coordinator.id === currentUser.id
  )
    return true;
  if (student && currentUser.role === "USER" && student.id === currentUser.id)
    return true;

  return false;
}

export {
  extractTextFromHTML,
  messegeDate,
  MAXLENGTH,
  lastData,
  showNameOfUser,
  creatorUser,
  showButtonSigniOut,
  currentUserCanManagerProfile,
  showEspecialRoute,
  showRoleName,
  currentUserCanManagerfiles,
};
