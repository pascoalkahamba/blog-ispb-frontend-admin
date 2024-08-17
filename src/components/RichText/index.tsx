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
import { Dispatch, SetStateAction, useRef } from "react";

import { useAtomValue } from "jotai";
import { errorAtom } from "@/storage/atom";

interface RichTextDemoProps {
  title: string;
  content: string;
  nameOfDepartamnet: string;
  setTitle: Dispatch<SetStateAction<string>>;
  setNameOfDepartament: Dispatch<SetStateAction<string>>;
  setContent: Dispatch<SetStateAction<string>>;
}
export default function RichTextDemo({
  content,
  setTitle,
  setContent,
  setNameOfDepartament,
  title,
  nameOfDepartamnet,
}: RichTextDemoProps) {
  const error = useAtomValue(errorAtom);

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
    content,
    editorProps: {
      attributes: {
        class: "text-slate-100 p-12",
      },
    },
    onUpdate({ editor }) {
      setContent(editor.getHTML());
      console.log("content", content.trim());
      console.log("title", title);
      console.log("nameOfDepartament", nameOfDepartamnet);
      console.log("texto editado", editor.getHTML());
    },
  });

  return (
    <section className="w-[70%] mt-0 flex flex-col gap-3 justify-center items-center">
      <InputWithIcon
        type="title"
        errorMessage="Digite o titulo"
        label="Titulo:"
        placeholder="Escreva o titulo"
        target="Titulo interessante"
        className="self-start w-full"
        setTitle={setTitle}
        title={title}
        setDepartament={setNameOfDepartament}
        nameOfDepartament={nameOfDepartamnet}
      />

      <InputWithIcon
        type="departament"
        errorMessage="Digite o nome do departamento"
        label="Nome do departamento:"
        placeholder="Escreva o titulo"
        target="Titulo interessante"
        className="self-start w-full"
        setTitle={setTitle}
        title={title}
        setDepartament={setNameOfDepartament}
        nameOfDepartament={nameOfDepartamnet}
      />
      <label htmlFor="content" className="self-start">
        Descrição:
      </label>
      <RichTextEditor
        editor={editor}
        id="content"
        aria-required="true"
        className="border-xs border-red-500 border-solid"
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
        <span className="italic text-red-600 self-start">
          Escreva um um post com mais de 20 caracteres
        </span>
      )}
    </section>
  );
}
