import { cn } from "@/lib/utils";

import { EditorContent, type Editor as TiptapEditor, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";

import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";

import {
  ArrowDownFromLineIcon,
  ArrowLeftFromLineIcon,
  ArrowRightFromLineIcon,
  ArrowUpFromLineIcon,
  Bold,
  CheckSquare,
  Code,
  Columns3Icon,
  Grid2X2PlusIcon,
  Grid2X2XIcon,
  HighlighterIcon,
  Italic,
  Link2Icon,
  List,
  ListOrdered,
  Quote,
  Rows3Icon,
  SeparatorHorizontalIcon,
  Strikethrough,
  TableIcon,
  TypeIcon,
} from "lucide-react";
import { useEffect } from "react";
import { Markdown } from "tiptap-markdown";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const TEXT_OPTIONS = [
  {
    label: "Normal text",
    value: "paragraph",
    icon: <TypeIcon className="w-4 h-4" />,
  },
  {
    label: "Heading 1",
    value: "h1",
    icon: <span className="text-sm">H1</span>,
  },
  {
    label: "Heading 2",
    value: "h2",
    icon: <span className="text-sm">H2</span>,
  },
];
const TABLE_ADD_OPTIONS = [
  {
    label: "Insert row above",
    value: "above",
    icon: ArrowUpFromLineIcon,
  },
  {
    label: "Insert row below",
    value: "below",
    icon: ArrowDownFromLineIcon,
  },
  {
    label: "Insert column left",
    value: "left",
    icon: ArrowLeftFromLineIcon,
  },
  {
    label: "Insert column right",
    value: "right",
    icon: ArrowRightFromLineIcon,
  },
];

export default function Editor({ value, onChange, placeholder = "Write something..." }: EditorProps) {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: "h-full flex-1",
      },
    },
    parseOptions: {
      preserveWhitespace: "full",
    },
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2],
          HTMLAttributes: {
            class: "text-zinc-900 dark:text-zinc-100",
          },
        },
        codeBlock: {
          HTMLAttributes: {
            class:
              "block rounded-md bg-zinc-100 dark:bg-zinc-800/30 p-4 font-mono text-sm text-zinc-900 dark:text-zinc-200 my-4",
          },
        },
        blockquote: {
          HTMLAttributes: {
            class: "bg-primary/5 text-muted-foreground italic border-l-4 border-primary py-2 pl-4",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal pl-6",
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: "list-disc pl-6",
          },
        },
        link: false,
      }),
      Link.configure({
        openOnClick: true,
        autolink: true,
        defaultProtocol: "https",
        HTMLAttributes: {
          class:
            "text-indigo-600 dark:text-indigo-400 underline cursor-pointer hover:text-indigo-800 dark:hover:text-indigo-300",
        },
      }),
      Highlight.configure({
        HTMLAttributes: {
          class: "bg-indigo-100 text-indigo-900 dark:bg-indigo-500/20 dark:text-indigo-300 rounded-sm px-1",
        },
      }),
      TaskList.configure({
        HTMLAttributes: {
          class: "not-prose pl-2",
        },
      }),
      TaskItem.configure({
        nested: true,
        HTMLAttributes: {
          class: "flex gap-2 items-start",
        },
      }),
      Markdown.configure({
        html: true,
        tightLists: true,
        linkify: true,
        breaks: true,
        transformPastedText: true,
        transformCopiedText: true,
      }),
      Placeholder.configure({
        placeholder,
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: "border-2",
        },
      }),
      TableRow,
      TableHeader.configure({
        HTMLAttributes: {
          class: "min-w-20 px-3 py-2 border-2 border-red",
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: "min-w-20 px-3 py-2 border-2 border-red",
        },
      }),
    ],
    onSelectionUpdate: ({ editor }) => {
      editor.commands.focus();
    },
    content: value,
    onUpdate: ({ editor }: { editor: TiptapEditor }) => {
      const markdown = editor.storage.markdown.getMarkdown();
      onChange(markdown);
    },
  });

  useEffect(() => {
    if (editor && value !== editor.storage.markdown.getMarkdown()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  const getCurrentTextStyle = () => {
    if (!editor) return TEXT_OPTIONS[0];
    if (editor.isActive("heading", { level: 1 })) return TEXT_OPTIONS[1];
    if (editor.isActive("heading", { level: 2 })) return TEXT_OPTIONS[2];
    // if (editor.isActive("heading", { level: 3 })) return TEXT_OPTIONS[3];
    return TEXT_OPTIONS[0];
  };

  const handleSetText = (value: string) => {
    switch (value) {
      case "paragraph":
        editor.chain().focus().setParagraph().run();
        break;

      case "h1":
        editor.chain().focus().toggleHeading({ level: 1 }).run();
        break;

      case "h2":
        editor.chain().focus().toggleHeading({ level: 2 }).run();
        break;
    }
  };

  const handleTableInsert = (value: string) => {
    switch (value) {
      case "above":
        editor.chain().focus().addRowBefore().run();
        break;
      case "below":
        editor.chain().focus().addRowAfter().run();
        break;
      case "right":
        editor.chain().focus().addColumnAfter().run();
        break;
      case "left":
        editor.chain().focus().addColumnBefore().run();
        break;
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full h-full prose prose-zinc dark:prose-invert max-w-none [&_.is-editor-empty]:text-zinc-500 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mt-8 [&_h1]:mb-4 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-6 [&_h2]:mb-3 flex flex-col">
      <div className="w-full whitespace-nowrap overflow-x-auto flex flex-wrap gap-1 p-3 border-b border-zinc-200 dark:border-zinc-800 flex-shrink-0 bg-zinc-100 dark:bg-zinc-800/30 static top-16 md:rounded-2xl">
        <div className="flex whitespace-nowrap">
          <HoverCard>
            <button
              type="button"
              className={cn("p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800")}
              onClick={(e) => e.preventDefault()}
            >
              <HoverCardTrigger className="p-1.5 rounded-lg text-left flex items-center gap-3 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                {/* < className="w-4 h-4 text-zinc-600 dark:text-zinc-400" /> */}
                {getCurrentTextStyle().icon}
                <span className="text-sm">{getCurrentTextStyle().label}</span>
              </HoverCardTrigger>
            </button>
            <HoverCardContent className="flex flex-col bg-zinc-100 dark:bg-zinc-800">
              {TEXT_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSetText(option.value)}
                  className={cn(
                    "p-1.5 rounded-lg text-left flex items-center gap-3 hover:bg-zinc-100 dark:hover:bg-zinc-800",
                  )}
                >
                  {option.icon}
                  <span className="text-sm">{option.label}</span>
                </button>
              ))}
            </HoverCardContent>
          </HoverCard>
          <div className="w-px h-full mx-1 bg-zinc-200 dark:bg-zinc-800" />
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={cn(
              "p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800",
              editor.isActive("bold") && "bg-zinc-100 dark:bg-zinc-800",
            )}
          >
            <Bold className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={cn(
              "p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800",
              editor.isActive("italic") && "bg-zinc-100 dark:bg-zinc-800",
            )}
          >
            <Italic className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={cn(
              "p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800",
              editor.isActive("strike") && "bg-zinc-100 dark:bg-zinc-800",
            )}
          >
            <Strikethrough className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={cn(
              "p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800",
              editor.isActive("highlight") && "bg-zinc-100 dark:bg-zinc-800",
            )}
          >
            <HighlighterIcon className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
          </button>
          <div className="w-px h-full mx-1 bg-zinc-200 dark:bg-zinc-800" />
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={cn(
              "p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800",
              editor.isActive("bulletList") && "bg-zinc-100 dark:bg-zinc-800",
            )}
          >
            <List className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={cn(
              "p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800",
              editor.isActive("orderedList") && "bg-zinc-100 dark:bg-zinc-800",
            )}
          >
            <ListOrdered className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleTaskList().run()}
            className={cn(
              "p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800",
              editor.isActive("taskList") && "bg-zinc-100 dark:bg-zinc-800",
            )}
          >
            <CheckSquare className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
          </button>
          <div className="w-px h-full mx-1 bg-zinc-200 dark:bg-zinc-800" />
          <button
            type="button"
            onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 2 }).run()}
            className={cn("p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800")}
          >
            <TableIcon className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
          </button>

          <HoverCard>
            <button
              type="button"
              className={cn("p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800")}
              onClick={(e) => e.preventDefault()}
            >
              <HoverCardTrigger className="">
                <Grid2X2PlusIcon className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
              </HoverCardTrigger>
            </button>
            <HoverCardContent className="flex flex-col bg-zinc-100 dark:bg-zinc-800">
              {TABLE_ADD_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleTableInsert(option.value)}
                  className={cn(
                    "p-1.5 rounded-lg text-left flex items-center gap-3 hover:bg-zinc-100 dark:hover:bg-zinc-800",
                  )}
                >
                  <option.icon className="w-4 h-4" />
                  <span className="text-sm">{option.label}</span>
                </button>
              ))}
            </HoverCardContent>
          </HoverCard>
          <HoverCard>
            <button
              type="button"
              className={cn("p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800")}
              onClick={(e) => e.preventDefault()}
            >
              <HoverCardTrigger className="">
                <Grid2X2XIcon className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
              </HoverCardTrigger>
            </button>
            <HoverCardContent className="flex flex-col bg-zinc-100 dark:bg-zinc-800">
              <button
                type="button"
                onClick={() => editor.chain().focus().deleteRow().run()}
                className={cn(
                  "p-1.5 rounded-lg text-left flex items-center gap-3 hover:bg-zinc-100 dark:hover:bg-zinc-800",
                )}
              >
                <Rows3Icon className="w-4 h-4" />
                <span className="text-sm">Delete Row</span>
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().deleteColumn().run()}
                className={cn(
                  "p-1.5 rounded-lg text-left flex items-center gap-3 hover:bg-zinc-100 dark:hover:bg-zinc-800",
                )}
              >
                <Columns3Icon className="w-4 h-4" />
                <span className="text-sm">Delete Column</span>
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().deleteTable().run()}
                className={cn(
                  "p-1.5 rounded-lg text-left flex items-center gap-3 hover:bg-zinc-100 dark:hover:bg-zinc-800",
                )}
              >
                <TableIcon className="w-4 h-4" />
                <span className="text-sm">Delete Table</span>
              </button>
            </HoverCardContent>
          </HoverCard>

          <div className="w-px h-full mx-1 bg-zinc-200 dark:bg-zinc-800" />
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={cn(
              "p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800",
              editor.isActive("blockquote") && "bg-zinc-100 dark:bg-zinc-800",
            )}
          >
            <Quote className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={cn(
              "p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800",
              editor.isActive("code") && "bg-zinc-100 dark:bg-zinc-800",
            )}
          >
            <Code className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
          </button>
          <button
            type="button"
            onClick={() => {
              editor.chain().focus().setHorizontalRule().run();
            }}
            className={cn("p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800")}
          >
            <SeparatorHorizontalIcon className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
          </button>
          <div className="w-px h-full mx-1 bg-zinc-200 dark:bg-zinc-800" />
          <button
            type="button"
            onClick={() => {
              const url = window.prompt("Enter URL:");
              if (url) {
                editor.chain().focus().setLink({ href: url }).run();
              }
            }}
            className={cn(
              "p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800",
              editor.isActive("link") && "bg-zinc-100 dark:bg-zinc-800",
            )}
          >
            <Link2Icon className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
          </button>
        </div>
      </div>
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: It adds two characters to the editor */}
      <div className="flex-1 overflow-y-auto cursor-text" onClick={() => editor.chain().focus().run()}>
        <EditorContent
          editor={editor}
          className="[&_*]:focus:outline-none px-3 py-3 [&_.ProseMirror]:min-h-full [&_.ProseMirror]:cursor-text"
        />
      </div>
    </div>
  );
}
