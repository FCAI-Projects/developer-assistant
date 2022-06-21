import { useMutation } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button } from "../../components/Button";
import { Input, Label, Textarea } from "../../components/forms";
import { RolesDocument, SendMailDocument } from "../../graphql/generated/graphql";

export const SendMails: React.FC = () => {
  const params = useParams();
  const [sendMails, { loading }] = useMutation(SendMailDocument);

  const formik = useFormik({
    initialValues: {
      title: "",
      message: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      message: Yup.string().required("Required"),
    }),
    onSubmit: async (values, formikApi) => {
      try {
        const res = await sendMails({
          variables: {
            sendMailId: params.id,
            title: values.title,
            message: values.message,
          },
        });
        formikApi.resetForm({
          values: {
            title: "",
            message: "",
          },
        });

        if (res.data.sendMail) {
          toast.success("E-mail Send to Client successfully");
        } else {
          toast.error("Error in sending e-mail");
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    },
  });

  return (
    <div>
      <header className="mb-3 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Send Email to Client</h2>
      </header>
      <main className="flex flex-col gap-3">
        <form className="flex flex-col gap-4">
          <div className="w-full">
            <Label htmlFor="title">Title</Label>
            <Input type="text" id="title" placeholder="Title" {...formik.getFieldProps("title")} />
          </div>
          <div className="w-full">
            <Label htmlFor="message">Message</Label>
            <Textarea
              className="h-52 resize-none"
              id="message"
              placeholder="Message . . ."
              {...formik.getFieldProps("message")}
            />
          </div>
        </form>
        <div className="flex justify-end">
          <Button green type="submit" onClick={() => formik.handleSubmit()} loading={loading}>
            Send
          </Button>
        </div>

        {/* <div className="flex flex-col gap-5">
          <h4 className="text-xl font-medium">Mail Templates</h4>
          <div className="cursor-pointer rounded-lg border p-3 shadow-sm hover:border-blue-500">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
              provident, quas, voluptate in nemo ab aliquam tenetur similique
              asperiores culpa illo omnis voluptatem quis a doloribus sunt esse
              illum voluptates.
            </p>
          </div>
          <div className="cursor-pointer rounded-lg border p-3 shadow-sm hover:border-blue-500">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
              provident, quas, voluptate in nemo ab aliquam tenetur similique
              asperiores culpa illo omnis voluptatem quis a doloribus sunt esse
              illum voluptates.
            </p>
          </div>
          <div className="cursor-pointer rounded-lg border p-3 shadow-sm hover:border-blue-500">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
              provident, quas, voluptate in nemo ab aliquam tenetur similique
              asperiores culpa illo omnis voluptatem quis a doloribus sunt esse
              illum voluptates.
            </p>
          </div>
          <div className="cursor-pointer rounded-lg border p-3 shadow-sm hover:border-blue-500">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
              provident, quas, voluptate in nemo ab aliquam tenetur similique
              asperiores culpa illo omnis voluptatem quis a doloribus sunt esse
              illum voluptates.
            </p>
          </div>
        </div> */}
      </main>
    </div>
  );
};
