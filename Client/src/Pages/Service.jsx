import { useAuth } from "./auth";

export const Service = () => {
  const { services } = useAuth();

  if (!Array.isArray(services)) {
    console.error("services is not an array or is undefined/null");
    return <div>Error loading services</div>;
  }

  // for (const service of services) {
  //   console.log(service);
  // }

  return (
    <>
      {services.map((curele, index) => {
        return (
          <div key={index}>
            <div>{curele.Name}</div>
            <div>{curele.Surname}</div>
          </div>
        );
      })}
    </>
  );
};
