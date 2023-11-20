import type { Deploy } from "@prisma/client";

interface CardProps {
  name: string;
  deploys: Deploy[];
}

const Card: React.FC<CardProps> = ({ name, deploys }) => {
  const firstDeploy = deploys.shift();
  const firstDeployDate = firstDeploy ? new Date(firstDeploy.createdAt) : null;
  return (
    <div>
      <div className="rounded-md border-2 border-gray-50 bg-white/20 p-6 shadow-sm transition-colors duration-300 hover:border-2 hover:border-black">
        <h2 className="mb-4 text-xl font-semibold">{name}</h2>
        {firstDeploy && firstDeployDate && (
          <>
            <p className="font-bold text-gray-700">{`${firstDeployDate.getDate()}/${
              firstDeployDate.getMonth() + 1
            }/${firstDeployDate.getFullYear()} - ${firstDeployDate.getHours()}h${firstDeployDate.getMinutes()}`}</p>
            <p className="mb-4 text-gray-700">
              {firstDeploy.branch} par {firstDeploy.name}
            </p>
          </>
        )}
        {deploys.length > 0 && (
          <>
            <details className="cursor-pointer text-gray-700">
              <summary>Historique</summary>
              <ul>
                {deploys.map((deploy, index) => {
                  const date = new Date(deploy.createdAt);
                  return (
                    <li key={`deploy_${name}_${index}`}>
                      <p className="font-bold text-gray-700">
                        {`${date.getDate()}/${
                          date.getMonth() + 1
                        }/${date.getFullYear()} - ${date.getHours()}h${date.getMinutes()}`}
                      </p>
                      <p className="mb-3 text-gray-700">
                        main par Arnaud Delante
                      </p>
                    </li>
                  );
                })}
              </ul>
            </details>
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
