import React, { useState, useEffect } from "react";
import { UpdateUserDocument, UploadAvatarDocument, UserDocument, useUserQuery } from "../../graphql/generated/graphql";
import { useMutation } from "@apollo/client";
import { useRecoilValue } from "recoil";
import { authState } from "../../recoil";
import { decodeToken } from "react-jwt";
import { getToken } from "../../firebaseInit";

const Notifications:  React.FC  = (props) => {
  const authToken = useRecoilValue(authState);
  const [isTokenFound, setTokenFound] = useState(false);
  const [id, setId] = useState("");
  const [updateUser, { loading: updateLoading }] = useMutation(UpdateUserDocument, {
    refetchQueries: [{ query: UserDocument, variables: { userId: id } }],
  });
  useEffect(() => {
    if (authToken) {
      const decode: any = decodeToken(authToken);
      setId(decode._id);
    }
  }, [authToken]);
  console.log("Token found", isTokenFound);

  // To load once
  useEffect(() => {
    let data;

    async function tokenFunc() {
      data = await getToken(setTokenFound);
      if (data) {
        
        await updateUser({
          variables: {
            user: {
              firebaseToken: data
            },
          },
        });
      }
      return data;
    }

    tokenFunc();
  }, [setTokenFound]);

  return <></>;
};

Notifications.propTypes = {};

export default Notifications;
