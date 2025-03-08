import { joinURL } from 'ufo'

export default defineEventHandler(async (event) => {
  const proxyUrl = useRuntimeConfig().apiProxyUrl
  
  const target = joinURL(proxyUrl, event.path)
  console.log(`Proxying request to ${target}`)
  
  return proxyRequest(event, target)
})