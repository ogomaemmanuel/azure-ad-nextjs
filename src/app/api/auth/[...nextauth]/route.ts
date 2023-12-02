import NextAuth from "next-auth"
import AzureAdProvider from "next-auth/providers/azure-ad"

const handler = NextAuth({
    
    providers:[AzureAdProvider({
        clientId: process.env.AZURE_AD_CLIENT_ID as string,
        clientSecret: process.env.AZURE_AD_CLIENT_SECRET as string,
        tenantId: process.env.AZURE_AD_TENANT_ID as string,

        authorization:{
    params:{
        scope:"openid email profile offline_access"
    }
        },
        
        httpOptions:{
            timeout: 50000
        }
    })],
    
    callbacks: {
        async jwt({ token, account, profile }) {
            if (account) {
                console.log(profile)
              token.accessToken = account.access_token
              token.refreshToken=account.refresh_token
              token.idToken=account.id_token
              token.id = profile?.sub
            }
            return token
          },
          async session({ session, token, user }) {
           
            session= {...session,...{
                accessToken:token.accessToken,
                refreshToken: token.refreshToken,
                idToken:token.idToken}}
            return session
          }
        },
    

})

export { handler as GET, handler as POST }
