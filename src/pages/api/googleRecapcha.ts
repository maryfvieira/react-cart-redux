import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

import "reflect-metadata";
import ApiClient from '@/services/httpclient/axios/apiClient';
import TYPES from '@/services/httpclient/axios/types';
import { Container } from "inversify";
import { GoogleRecapchaService } from "@/services/googleReCaptchaService";
import container from '@/di/ioc.config';

interface CaptchaRes {
  success: boolean;
  challenge_ts: string;
  hostname: string;
  "error-codes": any;
}

function getGoogleService(container: Container): GoogleRecapchaService {
    const googleService = container.get<ApiClient>(TYPES.ApiClient);
    return new GoogleRecapchaService(googleService);
  }

async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {

  const ua = (req.headers["user-agent"] || "").substring(0, 256);


  const capchaToken = req.body.captcha;

  if (req.method !== "POST"
    || !capchaToken || typeof capchaToken !== "string"
    || !process.env.RECAPTCHA_SECRET_KEY) {
    return res.status(400).send("Bad Request");
  }

  try {

    const result = await getGoogleService(container).verify(capchaToken);
    
    // Deny failed captcha
    if (result.error!= null) {
      return res.status(result.error._cause).send(result.error._message);
    }else{
        return res.status(200).json({
            data: "success"
          });
    }

  } catch (e) {
    console.error(e);
  }

  return res.status(400).send("Bad Request");
}

export default handler;