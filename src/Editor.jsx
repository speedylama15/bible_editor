import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";

import TabPlugin from "./TabPlugin";
import SpacePlugin from "./SpacePlugin";
import EnterPlugin from "./EnterPlugin";

import "./Editor.css";

const Editor = ({ config }) => {
  return (
    <div className="editor_container">
      <LexicalComposer initialConfig={config}>
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              className="editor"
              aria-placeholder={"Enter some text..."}
              placeholder={
                <div className="editor_placeholder">Enter some text...</div>
              }
            />
          }
          ErrorBoundary={LexicalErrorBoundary}
        />

        <TabPlugin />
        <SpacePlugin />
        <EnterPlugin />

        {/* IDEA: we can use DOM events in Lexical */}

        <HistoryPlugin />

        <AutoFocusPlugin />
      </LexicalComposer>
    </div>
  );
};

export default Editor;
