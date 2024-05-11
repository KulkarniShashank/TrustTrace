export class OutOfBandIssuance {
  public outOfBandIssuance(
    email: string,
    orgName: string,
    agentEndPoint: string,
  ): string {
    try {
      return `<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <title></title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        
        <body style="margin: 0px; padding:0px; background-color:#F9F9F9;">
            <div style="margin: auto; max-width: 450px; padding: 20px 30px; background-color: #FFFFFF; display:block;">
                <div style="display: block; text-align:center;" >
                </div>
                <div style="font-family: Montserrat; font-style: normal; font-weight: 500;
                font-size: 15px; line-height: 24px;color: #00000;">
                    <p style="margin-top:0px">
                        Hello ${email},
                    </p>
                    <p>
                    <b>${orgName}</b> has initiated issuance of your digital credential to you.
                    
                    To acknowledge and access your credential, kindly proceed with following steps:
                        <div style="text-align: center; padding-bottom: 20px;">
                        <a clicktracking=off href="${agentEndPoint}"
                            style="padding: 10px 20px 10px 20px;color: #fff;background: #1F4EAD;border-radius: 5px;text-decoration: none;">
                            Accept Credential
                        </a>
                    </div>
                    
                     </p>
                     
                    <hr style="border-top:1px solid #e8e8e8" />
                    <footer style="padding-top: 20px;">
                       
                        <div style="font-style: italic; color: #777777">
                        For any assistance or questions while accessing your account, please do not hesitate to contact the support team. Our team will ensure a seamless onboarding experience for you.
  
                    </div>
                    </footer>
                </div>
            </div>
        </body>
        </html>`;
    } catch (error) {}
  }
}
