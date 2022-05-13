export const Form: React.FC = () => {
  return <div>Form</div>;
};

export interface UploadFileProps extends React.HTMLAttributes<HTMLInputElement> {
  note?: string;
  label?: string;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}
