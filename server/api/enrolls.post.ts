interface ReCaptchaResponse {
  success: boolean;
  challenge_ts: string;
  hostname: string;
  credit?: boolean;
  'error-codes'?: string[];
  score?: number;
  score_reason?: string[];
}

const enrollsPost = defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const { apiBase, apiToken, secretKey } = runtimeConfig.public
  
  const body = await readBody<{
    data: any
    hcaptChaToken: string
  }>(event)
  
  
  // const verifyRes: ReCaptchaResponse = await $fetch('https://api.hcaptcha.com/siteverify', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //   },
  //   body: new URLSearchParams({
  //     response: body.hcaptChaToken,
  //     secret: secretKey,
  //   }),
  // })
  
  const verifyRes: ReCaptchaResponse = await $fetch(`${apiBase}/api/enroll`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
    body: {
      data: body.data
    },
  }
  )
  // if (verifyRes.success) {  
  //   const response = await $fetch<unknown>(`http:///api/enrolls`, {
  //     method: 'POST',
  //     headers: {
  //       Authorization: `Bearer ${apiToken}`,
  //     },
  //     body: {
  //       data: body.data
  //     },
  //   })

  //   return response
  // } else {
    return verifyRes
  // }
})

export default enrollsPost
