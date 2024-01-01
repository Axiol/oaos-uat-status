import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";
import type { Deploy } from "@prisma/client";

type ResponseData = {
  code: string;
  message?: string;
  deploy?: Deploy;
  deploys?: {
    PRD: Deploy[];
    UAT: Deploy[];
    U1AT: Deploy[];
    U2AT: Deploy[];
    U3AT: Deploy[];
  };
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) => {
  switch (req.method) {
    case "POST":
      console.log(req.query);
      if (!req.query.branch || !req.query.name || !req.query.env) {
        res.status(400).json({
          code: "MISSING-BODY",
          message: "Missing parameters",
        });

        return;
      }

      const deploy = await db.deploy.create({
        data: {
          branch: req.query.branch as string,
          name: req.query.name as string,
          env: req.query.env as string,
        },
      });
      res.status(200).json({ code: "OK", deploy });
      break;

    case "GET":
      const deploysPRD = await db.deploy.findMany({
        take: 5,
        where: {
          env: "PRD",
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      const deploysUAT = await db.deploy.findMany({
        take: 5,
        where: {
          env: "UAT",
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      const deploysU1AT = await db.deploy.findMany({
        take: 5,
        where: {
          env: "U1AT",
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      const deploysU2AT = await db.deploy.findMany({
        take: 5,
        where: {
          env: "U2AT",
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      const deploysU3AT = await db.deploy.findMany({
        take: 5,
        where: {
          env: "U3AT",
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      res.status(200).json({
        code: "OK",
        deploys: {
          PRD: deploysPRD,
          UAT: deploysUAT,
          U1AT: deploysU1AT,
          U2AT: deploysU2AT,
          U3AT: deploysU3AT,
        },
      });
      break;
  }
};

export default handler;
