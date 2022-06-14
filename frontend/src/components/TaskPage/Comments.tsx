import { useMutation, useQuery } from "@apollo/client";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { FaGreaterThanEqual, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { CommentsDocument, CreateCommentDocument, RemoveCommentDocument } from "../../graphql/generated/graphql";
import { Button } from "../Button";
import { Textarea } from "../forms";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { authState } from "../../recoil";
import { decodeToken } from "react-jwt";

interface CommentsProps {}

export const Comments: React.FC<CommentsProps> = () => {
  const authToken = useRecoilValue(authState);
  const [id, setId] = useState("");
  const taskId = useParams().taskId;
  const { data } = useQuery(CommentsDocument, {variables: {taskId: taskId}});
  const [addComment, { loading }] = useMutation(CreateCommentDocument, {
    refetchQueries: [{ query: CommentsDocument, variables: { taskId: taskId } }],
  });
  const [deleteComment, { loading : DeleteLoding }] = useMutation(RemoveCommentDocument, {
    refetchQueries: [{ query: CommentsDocument, variables: { taskId: taskId } }],
  });

  useEffect(() => {
    if (authToken) {
      const decode: any = decodeToken(authToken);
      setId(decode._id);
    }
  }, [authToken]);

  const formik = useFormik({
    initialValues: {
      content: "",
    },
    validationSchema: Yup.object({
      content: Yup.string().required("Required"),
    }),
    onSubmit: async (values, formikApi) => {
      try {
        await addComment({
          variables: {
            createCommentInput: {
              user: id,
              task: taskId,
              content: values.content
            },
          },
        });
        formikApi.resetForm({
          values: {
            content: "",
          },
        });
        toast.success("Comment Added successfully");
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handelDelete = async (id: string) => {
    try {
      await deleteComment({
        variables: {
          removeCommentId: id,
        },
      });
      toast.success("Comment Deleted successfully");
    } catch (error) {
      toast.error("Comment Can't be deleted");
    }
  }

  return (
    <div>
      <h6 className="mb-1 flex items-center gap-2">
        <FaGreaterThanEqual className="text-sm" />
        Comments
      </h6>
      <div className="flex flex-col gap-2">
        { data?.comments && data?.comments.map((comment: any) => {
          return (
            <div 
              key={comment.id}
              className="flex flex-row gap-2 rounded-3xl rounded-br-none bg-slate-200 px-3 py-4"
            >
              <div className="flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9"
                  alt=""
                  className="h-12 w-12 rounded-full"
                />
              </div>

              <div className="px-2 w-full">
                <header className="flex items-center justify-between">
                  <h6 className="font-medium">{comment.user.fname +" "+ comment.user.lname}</h6>
                  <div className="flex items-center">
                    <p className="text-xs">{new Date(comment.createdAt).toLocaleString('en-us')}</p>
                    <Button
                      lightRed
                      className="ml-2 px-2 py-2 text-xs"
                      onClick={() => { handelDelete(comment.id) }}
                      disabled={DeleteLoding}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                </header>
                <p className="text-slate-600">{comment.content}</p>
              </div>
            </div>
          );
        })}

        <div className="flex flex-row gap-2 rounded-3xl rounded-br-none bg-slate-100 px-3 py-4">
          <Textarea 
            className="w-full resize-none" 
            placeholder="Write your comment"
            id="content"
            {...formik.getFieldProps("content")}
          />
          <Button lightGreen type="submit" onClick={() => formik.handleSubmit()} loading={loading}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};