const STORE_ID = 58958138
const TOKEN = 'public_7BxbJGWyDaZfSQqjVS5Ftr4jzXkS43UD'

const requestService = async (endpointName: string) => {
  const res = await fetch(
    `https://app.ecwid.com/api/v3/${STORE_ID}/${endpointName}`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  )

  return res.json()
}

export default requestService
