"use client";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Color from "@tiptap/extension-color";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { IconColorPicker } from "@tabler/icons-react";
import InputWithIcon from "../InputWithIcon";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { ComboboxItem, Select } from "@mantine/core";

import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { departmentIdAtom, errorAtom } from "@/storage/atom";
import useQueryPost from "@/hooks/useQueryPost";
import { getAllDepartments } from "@/server";
import { useField } from "@mantine/form";

interface RichTextDemoProps {
  title: string;
  content: string;
  setTitle: Dispatch<SetStateAction<string>>;
  setContent: Dispatch<SetStateAction<string>>;
}
export default function RichTextDemo({
  content,
  setTitle,
  setContent,
  title,
}: RichTextDemoProps) {
  const error = useAtomValue(errorAtom);
  const [departmentId, setDepartmentId] = useAtom(departmentIdAtom);
  const {
    query: { data },
  } = useQueryPost(getAllDepartments, "allDepartments");

  const allDepartments = useMemo(() => {
    return data?.map(({ id, name }) => ({
      value: `${id}`,
      label: name,
    }));
  }, [data]);

  const field = useField({
    initialValue: 0,
    onValueChange: (value) => setDepartmentId(value),
    validateOnBlur: true,
    validate: (value) => !value && "Escolha um departamento antes de postar.",
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      TextStyle,
      Superscript,
      Placeholder.configure({ placeholder: "Escreva o seu post" }),
      Color,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: content,

    editorProps: {
      attributes: {
        class: "text-slate-100 p-12",
      },
    },
    onUpdate({ editor }) {
      setContent(editor.getHTML());
    },
  });

  return (
    <section className="max-w-[70%] mt-0 flex flex-col gap-3 justify-center items-center">
      <InputWithIcon
        errorMessage="Digite o titulo"
        label="Titulo:"
        placeholder="Escreva o titulo"
        target="Titulo interessante"
        className="self-start w-full"
        setTitle={setTitle}
        title={title}
      />

      <Select
        required
        label="Nome do Departamento"
        {...field.getInputProps()}
        value={`${departmentId}`}
        placeholder="Escolha um departamento"
        className="self-start w-full"
        data={allDepartments}
        withAsterisk
        clearable
        searchable
      />

      <label htmlFor="content" className="self-start">
        Descrição:
      </label>
      <RichTextEditor
        defaultValue={content}
        editor={editor}
        id="content"
        aria-required={true}
        className={` ${
          error && content.trim().length < 20
            ? "border-xs border-red-500 border-solid"
            : ""
        }`}
      >
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Undo />
            <RichTextEditor.Redo />
          </RichTextEditor.ControlsGroup>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Control interactive={false}>
              <IconColorPicker size="1rem" stroke={1.5} />
            </RichTextEditor.Control>
            <RichTextEditor.Color color="#F03E3E" />
            <RichTextEditor.Color color="#7048E8" />
            <RichTextEditor.Color color="#1098AD" />
            <RichTextEditor.Color color="#37B24D" />
            <RichTextEditor.Color color="#F59F00" />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
        <RichTextEditor.ColorPicker
          colors={[
            "#25262b",
            "#868e96",
            "#fa5252",
            "#e64980",
            "#be4bdb",
            "#7950f2",
            "#4c6ef5",
            "#228be6",
            "#15aabf",
            "#12b886",
            "#40c057",
            "#82c91e",
            "#fab005",
            "#fd7e14",
          ]}
        />
      </RichTextEditor>
      {error && content.trim().length < 20 && (
        <span className="italic text-red-600 self-start text-sm">
          Escreva um um post com mais de 20 caracteres
        </span>
      )}
    </section>
  );
}
