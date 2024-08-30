import { IUseReactions } from "@/interfaces";
import { useEffect, useState } from "react";

export default function useReactions({
  like,
  statusLike,
  statusUnlike,
  unlike,
}: IUseReactions) {
  const [reacted, setReacted] = useState({
    statusLike,
    statusUnlike,
  });
  const [reactions, setReactions] = useState({
    like,
    unlike,
  });

  const addLike = () =>
    setReacted((reacted) => ({
      statusLike: !reacted.statusLike,
      statusUnlike: false,
    }));

  const addUnlike = () =>
    setReacted((reacted) => ({
      statusLike: false,
      statusUnlike: !reacted.statusUnlike,
    }));

  useEffect(() => {
    if (reacted.statusLike) {
      setReactions((reactions) => ({
        like: reactions.like++,
        unlike: reactions.unlike,
      }));
      return;
    }
    if (!reacted.statusLike) {
      setReactions((reactions) => ({
        like: reactions.like--,
        unlike: reactions.unlike,
      }));
      return;
    }
  }, [reacted.statusLike]);

  useEffect(() => {
    if (reacted.statusUnlike) {
      setReactions((reactions) => ({
        like: reactions.like,
        unlike: reactions.unlike++,
      }));
      return;
    }
    if (!reacted.statusUnlike) {
      setReactions((reactions) => ({
        like: reactions.like,
        unlike: reactions.unlike--,
      }));
      return;
    }
  }, [reacted.statusUnlike]);

  return { reacted, reactions, addLike, addUnlike };
}
