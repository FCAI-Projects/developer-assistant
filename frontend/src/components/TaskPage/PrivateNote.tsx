import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { FaGreaterThanEqual } from "react-icons/fa";
import { decodeToken } from "react-jwt";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { FilterNotesDocument, UpdateNoteDocument } from "../../graphql/generated/graphql";
import { authState } from "../../recoil";
import { Editable } from "../Editable";
import { AddPrivateNotesModel } from "../modals/AddPrivateNotesModel";

interface PrivateNoteProps {}

export const PrivateNote: React.FC<PrivateNoteProps> = () => {
  const authToken = useRecoilValue(authState);
  const [id, setId] = useState("");
  const { taskId } = useParams();
  const { 
    data: noteData,
    refetch: refetchNote
  } = useQuery(FilterNotesDocument, {
    variables: {
      filter: {
        task: taskId,
        user: id,
      },
    },
  });
  const [updateNote, {error: updateError}] = useMutation(UpdateNoteDocument, {
    refetchQueries: [{ query: FilterNotesDocument, variables: { filter: { task: taskId, user: id } } }],
  });

  const handleUpdateNote = async (noteId: string, value: string) => {
    await updateNote({
      variables: {
        updateNoteId: noteId,
        updateNoteInput: {
          note: value,
        },
      },
    });
    toast.success("Note updated");
  };

  useEffect(() => {
    if (authToken) {
      const decode: any = decodeToken(authToken);
      setId(decode._id);
    }
  }, [authToken]);

  useEffect(() => {
    if (noteData?.filterNotes.id) {
      refetchNote();
    }
    if (updateError) {
      toast.error("Error updating Note");
    }
  }, [noteData?.filterNotes.id, updateError]);

  return (
    <div className="border-b pb-2">
      <header className="mb-2 flex items-center justify-between">
        <h6 className="mb-1 flex items-center gap-2">
          <FaGreaterThanEqual className="text-sm" />
          Private Notes
        </h6>
        {!noteData?.filterNotes && 
          <AddPrivateNotesModel userId={id} taskId={taskId} />
        }
      </header>
      {noteData?.filterNotes ? (
        <div>
          <Editable
            value={noteData?.filterNotes.note ==="" ? "No Note" : noteData?.filterNotes.note}
            onChange={(value) => handleUpdateNote(noteData?.filterNotes.id, value)}
            tag="p"
          />
        </div>
      ):(
        <p className="ml-2 text-slate-500">Note is Empty</p>
      )}
    </div>
  );
};
