import React, { FC } from "react";
import MembershipForm, {
  FormData,
} from "../../components/MembershipForm/MembershipForm";

interface MembershipPageProps {}

const MembershipPage: FC<MembershipPageProps> = () => {
  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className="container mx-auto max-w-xl" data-testid="MembershipPage">
      <h1 className="my-4 text-xl">
        Formulaire d'adhésion à la maison citoyenne
      </h1>
      <MembershipForm onSubmit={onSubmit} />
    </div>
  );
};

export default MembershipPage;
