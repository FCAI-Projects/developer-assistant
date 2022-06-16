import { useFormik } from "formik";
import React from "react";
import { useToggleModal } from "../../hooks/useToggleModal";
import { Button } from "../Button";
import * as Yup from "yup";
import { Modal } from "./Base";
import { useMutation } from "@apollo/client";
import { CreatePaymentDocument, FindPaymentsDocument } from "../../graphql/generated/graphql";
import { Input, Label } from "../forms";
import { FaDollarSign } from "react-icons/fa";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

export const AddPaymentModel: React.FC = () => {
  const params = useParams();
  const [addPayment, { data, loading }] = useMutation(CreatePaymentDocument, {
    refetchQueries:  [{ query: FindPaymentsDocument, variables: { project: params.id } }],
  });
  const [isOpen, toggleModal] = useToggleModal();
  const formik = useFormik({
    initialValues: {
      amount: 0,
    },
    validationSchema: Yup.object({
      amount: Yup.number().required("Required"),
    }),
    onSubmit: async (values, formikApi) => {
      try {
       const res =  await addPayment({
          variables: {
            createPaymentInput: {
              project: params.id,
              amount: values.amount,
            },
          },
        });
        formikApi.resetForm({ 
          values: { 
            amount: 0
          } 
        });
        await navigator.clipboard.writeText(res.data.createPayment.paymentUrl); 
        toggleModal();
        toast.success("Payment Added and Link copied to clipboard");
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <>
      <Button lightBlue className="flex items-center gap-2" onClick={toggleModal}>
        <FaDollarSign />
        Add Payment
      </Button>
      <Modal title="Add Payment" isOpen={isOpen} handleClose={toggleModal}>
        <div className="my-5">
          <form className="flex flex-col gap-4">
            <div className="w-full">
              <Label htmlFor="amount">Amount</Label>
              <Input
                type="number"
                id="amount"
                placeholder="Amount"
                {...formik.getFieldProps("amount")}
                error={formik.touched.amount ? formik.errors.amount : ""}
              />
            </div>
          </form>
        </div>
        <div className="flex flex-row-reverse gap-3">
          <Button green type="submit" onClick={() => formik.handleSubmit()} loading={loading}>
            Add
          </Button>
          <Button type="submit" lightRed onClick={toggleModal}>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
};
