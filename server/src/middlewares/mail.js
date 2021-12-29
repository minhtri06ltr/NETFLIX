const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const fs = require("fs");
const { OAuth2 } = google.auth;

const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";
const {
  MAILING_SERVICE_ID_KEY,
  MAILING_SERVICE_SECRET_KEY,
  SENDER_EMAIL_ADDRESS,
  MAILING_SERVICE_REFRESH_TOKEN_KEY,
} = process.env;

const oauth2Client = new OAuth2(
  MAILING_SERVICE_ID_KEY,
  MAILING_SERVICE_SECRET_KEY,
  OAUTH_PLAYGROUND,
  MAILING_SERVICE_REFRESH_TOKEN_KEY
);

//send mail
exports.sendMail = (to, url, type) => {
  oauth2Client.setCredentials({
    refresh_token: MAILING_SERVICE_REFRESH_TOKEN_KEY,
  });
  const accessToken = oauth2Client.getAccessToken();
  const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: SENDER_EMAIL_ADDRESS,
      clientId: MAILING_SERVICE_ID_KEY,
      clientSecret: MAILING_SERVICE_SECRET_KEY,
      refreshToken: MAILING_SERVICE_REFRESH_TOKEN_KEY,
      accessToken,
    },
  });
  const mailOptions = {
    from: SENDER_EMAIL_ADDRESS,
    to: to,
    subject:
      type === "activate" ? "HOLOFLIX Verify Email" : "HOLOFLIX Reset Password",
    html:
      type === "activate"
        ? `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html
      xmlns="http://www.w3.org/1999/xhtml"
      xmlns:v="urn:schemas-microsoft-com:vml"
      xmlns:o="urn:schemas-microsoft-com:office:office"
    >
      <head>
        <!--[if gte mso 9]>
          <xml>
            <o:OfficeDocumentSettings>
              <o:AllowPNG />
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
        <![endif]-->
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="x-apple-disable-message-reformatting" />
        <!--[if !mso]><!-->
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <!--<![endif]-->
        <title></title>
    
        <style type="text/css">
          table,
          td {
            color: #000000;
          }
          a {
            color: #0000ee;
            text-decoration: underline;
          }
          @media (max-width: 480px) {
            #u_content_text_7 .v-text-align {
              text-align: center !important;
            }
            #u_content_text_8 .v-text-align {
              text-align: center !important;
            }
          }
          @media only screen and (min-width: 620px) {
            .u-row {
              width: 600px !important;
            }
            .u-row .u-col {
              vertical-align: top;
            }
    
            .u-row .u-col-50 {
              width: 300px !important;
            }
    
            .u-row .u-col-100 {
              width: 600px !important;
            }
          }
    
          @media (max-width: 620px) {
            .u-row-container {
              max-width: 100% !important;
              padding-left: 0px !important;
              padding-right: 0px !important;
            }
            .u-row .u-col {
              min-width: 320px !important;
              max-width: 100% !important;
              display: block !important;
            }
            .u-row {
              width: calc(100% - 40px) !important;
            }
            .u-col {
              width: 100% !important;
            }
            .u-col > div {
              margin: 0 auto;
            }
          }
          body {
            margin: 0;
            padding: 0;
          }
    
          table,
          tr,
          td {
            vertical-align: top;
            border-collapse: collapse;
          }
    
          p {
            margin: 0;
          }
    
          .ie-container table,
          .mso-container table {
            table-layout: fixed;
          }
    
          * {
            line-height: inherit;
          }
    
          a[x-apple-data-detectors="true"] {
            color: inherit !important;
            text-decoration: none !important;
          }
        </style>
    
        <!--[if !mso]><!-->
        <link
          href="https://fonts.googleapis.com/css?family=Cabin:400,700&display=swap"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Raleway:400,700&display=swap"
          rel="stylesheet"
          type="text/css"
        />
        <!--<![endif]-->
      </head>
    
      <body
        class="clean-body u_body"
        style="
          margin: 0;
          padding: 0;
          -webkit-text-size-adjust: 100%;
          background-color: #ecf0f1;
          color: #000000;
        "
      >
        <!--[if IE]><div class="ie-container"><![endif]-->
        <!--[if mso]><div class="mso-container"><![endif]-->
        <table
          style="
            border-collapse: collapse;
            table-layout: fixed;
            border-spacing: 0;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            vertical-align: top;
            min-width: 320px;
            margin: 0 auto;
            background-color: #ecf0f1;
            width: 100%;
          "
          cellpadding="0"
          cellspacing="0"
        >
          <tbody>
            <tr style="vertical-align: top">
              <td
                style="
                  word-break: break-word;
                  border-collapse: collapse !important;
                  vertical-align: top;
                "
              >
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #ecf0f1;"><![endif]-->
    
                <div
                  class="u-row-container"
                  style="padding: 0px; background-color: transparent"
                >
                  <div
                    class="u-row"
                    style="
                      margin: 0 auto;
                      min-width: 320px;
                      max-width: 600px;
                      overflow-wrap: break-word;
                      word-wrap: break-word;
                      word-break: break-word;
                      background-color: transparent;
                    "
                  >
                    <div
                      style="
                        border-collapse: collapse;
                        display: table;
                        width: 100%;
                        background-color: transparent;
                      "
                    >
                      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
    
                      <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                      <div
                        class="u-col u-col-100"
                        style="
                          max-width: 320px;
                          min-width: 600px;
                          display: table-cell;
                          vertical-align: top;
                        "
                      >
                        <div style="width: 100% !important">
                          <!--[if (!mso)&(!IE)]><!--><div
                            style="
                              padding: 0px;
                              border-top: 0px solid transparent;
                              border-left: 0px solid transparent;
                              border-right: 0px solid transparent;
                              border-bottom: 0px solid transparent;
                            "
                          ><!--<![endif]-->
                            <table
                              style="font-family: 'Open Sans', sans-serif"
                              role="presentation"
                              cellpadding="0"
                              cellspacing="0"
                              width="100%"
                              border="0"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    style="
                                      overflow-wrap: break-word;
                                      word-break: break-word;
                                      padding: 6px;
                                      font-family: 'Open Sans', sans-serif;
                                    "
                                    align="left"
                                  >
                                    <table
                                      height="0px"
                                      align="center"
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      style="
                                        border-collapse: collapse;
                                        table-layout: fixed;
                                        border-spacing: 0;
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        vertical-align: top;
                                        border-top: 0px solid #ffffff;
                                        -ms-text-size-adjust: 100%;
                                        -webkit-text-size-adjust: 100%;
                                      "
                                    >
                                      <tbody>
                                        <tr style="vertical-align: top">
                                          <td
                                            style="
                                              word-break: break-word;
                                              border-collapse: collapse !important;
                                              vertical-align: top;
                                              font-size: 0px;
                                              line-height: 0px;
                                              mso-line-height-rule: exactly;
                                              -ms-text-size-adjust: 100%;
                                              -webkit-text-size-adjust: 100%;
                                            "
                                          >
                                            <span>&#160;</span>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
    
                            <!--[if (!mso)&(!IE)]><!-->
                          </div>
                          <!--<![endif]-->
                        </div>
                      </div>
                      <!--[if (mso)|(IE)]></td><![endif]-->
                      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                    </div>
                  </div>
                </div>
    
                <div
                  class="u-row-container"
                  style="padding: 0px; background-color: transparent"
                >
                  <div
                    class="u-row"
                    style="
                      margin: 0 auto;
                      min-width: 320px;
                      max-width: 600px;
                      overflow-wrap: break-word;
                      word-wrap: break-word;
                      word-break: break-word;
                      background-color: #ffffff;
                    "
                  >
                    <div
                      style="
                        border-collapse: collapse;
                        display: table;
                        width: 100%;
                        background-color: transparent;
                      "
                    >
                      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
    
                      <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                      <div
                        class="u-col u-col-100"
                        style="
                          max-width: 320px;
                          min-width: 600px;
                          display: table-cell;
                          vertical-align: top;
                        "
                      >
                        <div style="width: 100% !important">
                          <!--[if (!mso)&(!IE)]><!--><div
                            style="
                              padding: 0px;
                              border-top: 0px solid transparent;
                              border-left: 0px solid transparent;
                              border-right: 0px solid transparent;
                              border-bottom: 0px solid transparent;
                            "
                          ><!--<![endif]-->
                            <table
                              style="font-family: 'Open Sans', sans-serif"
                              role="presentation"
                              cellpadding="0"
                              cellspacing="0"
                              width="100%"
                              border="0"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    style="
                                      overflow-wrap: break-word;
                                      word-break: break-word;
                                      padding: 20px 10px 10px;
                                      font-family: 'Open Sans', sans-serif;
                                    "
                                    align="left"
                                  >
                                    <table
                                      width="100%"
                                      cellpadding="0"
                                      cellspacing="0"
                                      border="0"
                                    >
                                      <tr>
                                        <td
                                          class="v-text-align"
                                          style="
                                            padding-right: 0px;
                                            padding-left: 0px;
                                          "
                                          align="center"
                                        >
                                          <img
                                            align="center"
                                            border="0"
                                            src="https://upload.wikimedia.org/wikipedia/commons/9/95/Hololive_Production.png"
                                            alt="Image"
                                            title="Image"
                                            style="
                                              outline: none;
                                              text-decoration: none;
                                              -ms-interpolation-mode: bicubic;
                                              clear: both;
                                              display: inline-block !important;
                                              border: none;
                                              height: auto;
                                              float: none;
                                              width: 26%;
                                              max-width: 150.8px;
                                            "
                                            width="150.8"
                                          />
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
    
                            <!--[if (!mso)&(!IE)]><!-->
                          </div>
                          <!--<![endif]-->
                        </div>
                      </div>
                      <!--[if (mso)|(IE)]></td><![endif]-->
                      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                    </div>
                  </div>
                </div>
    
                <div
                  class="u-row-container"
                  style="padding: 0px; background-color: transparent"
                >
                  <div
                    class="u-row"
                    style="
                      margin: 0 auto;
                      min-width: 320px;
                      max-width: 600px;
                      overflow-wrap: break-word;
                      word-wrap: break-word;
                      word-break: break-word;
                      background-color: #fffbfb;
                    "
                  >
                    <div
                      style="
                        border-collapse: collapse;
                        display: table;
                        width: 100%;
                        background-color: transparent;
                      "
                    >
                      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #fffbfb;"><![endif]-->
    
                      <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                      <div
                        class="u-col u-col-100"
                        style="
                          max-width: 320px;
                          min-width: 600px;
                          display: table-cell;
                          vertical-align: top;
                        "
                      >
                        <div style="width: 100% !important">
                          <!--[if (!mso)&(!IE)]><!--><div
                            style="
                              padding: 0px;
                              border-top: 0px solid transparent;
                              border-left: 0px solid transparent;
                              border-right: 0px solid transparent;
                              border-bottom: 0px solid transparent;
                            "
                          ><!--<![endif]-->
                            <table
                              style="font-family: 'Open Sans', sans-serif"
                              role="presentation"
                              cellpadding="0"
                              cellspacing="0"
                              width="100%"
                              border="0"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    style="
                                      overflow-wrap: break-word;
                                      word-break: break-word;
                                      padding: 6px;
                                      font-family: 'Open Sans', sans-serif;
                                    "
                                    align="left"
                                  >
                                    <table
                                      height="0px"
                                      align="center"
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      style="
                                        border-collapse: collapse;
                                        table-layout: fixed;
                                        border-spacing: 0;
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        vertical-align: top;
                                        border-top: 0px solid #ffffff;
                                        -ms-text-size-adjust: 100%;
                                        -webkit-text-size-adjust: 100%;
                                      "
                                    >
                                      <tbody>
                                        <tr style="vertical-align: top">
                                          <td
                                            style="
                                              word-break: break-word;
                                              border-collapse: collapse !important;
                                              vertical-align: top;
                                              font-size: 0px;
                                              line-height: 0px;
                                              mso-line-height-rule: exactly;
                                              -ms-text-size-adjust: 100%;
                                              -webkit-text-size-adjust: 100%;
                                            "
                                          >
                                            <span>&#160;</span>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
    
                            <!--[if (!mso)&(!IE)]><!-->
                          </div>
                          <!--<![endif]-->
                        </div>
                      </div>
                      <!--[if (mso)|(IE)]></td><![endif]-->
                      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                    </div>
                  </div>
                </div>
    
                <div
                  class="u-row-container"
                  style="padding: 0px; background-color: transparent"
                >
                  <div
                    class="u-row"
                    style="
                      height: 641px;
                      margin: 0 auto;
                      min-width: 320px;
                      max-width: 600px;
                      overflow-wrap: break-word;
                      word-wrap: break-word;
                      word-break: break-word;
                      background-color: #5373c1;
                    "
                  >
                    <div
                      style="
                        border-collapse: collapse;
                        display: table;
                        width: 100%;
                        height: 100%;
                        background-image: url('https://steamuserimages-a.akamaihd.net/ugc/1266023477082153033/A0261FCFB2E9E0A0F3BE4B27CB5FFFE9FE751B56/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false');
                        background-position: center top;
                        background-color: transparent;
                      "
                    >
                      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-image: url('images/image-6.gif');background-repeat: no-repeat;background-position: center top;background-color: #5373c1;"><![endif]-->
    
                      <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                      <div
                        class="u-col u-col-100"
                        style="
                          max-width: 320px;
                          min-width: 600px;
                          display: table-cell;
                          vertical-align: top;
                        "
                      >
                        <div style="width: 100% !important">
                          <!--[if (!mso)&(!IE)]><!--><div
                            style="
                              padding: 0px;
                              border-top: 0px solid transparent;
                              border-left: 0px solid transparent;
                              border-right: 0px solid transparent;
                              border-bottom: 0px solid transparent;
                            "
                          ><!--<![endif]-->
                            <table
                              style="font-family: 'Open Sans', sans-serif"
                              role="presentation"
                              cellpadding="0"
                              cellspacing="0"
                              width="100%"
                              border="0"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    style="
                                      overflow-wrap: break-word;
                                      word-break: break-word;
                                      padding: 25px;
                                      font-family: 'Open Sans', sans-serif;
                                    "
                                    align="left"
                                  >
                                    <div
                                      class="v-text-align"
                                      style="
                                        line-height: 140%;
                                        margin-top: 50%;
                                        text-align: center;
                                        word-wrap: break-word;
                                      "
                                    >
                                      <p
                                        style="
                                          font-size: 14px;
                                          line-height: 140%;
                                          text-align: center;
                                        "
                                      >
                                        <span
                                          style="
                                            font-size: 34px;
                                            line-height: 47.6px;
                                            color: #ffffff;
                                          "
                                          ><strong
                                            ><span
                                              style="
                                                line-height: 47.6px;
                                                font-family: Raleway, sans-serif;
                                                font-size: 34px;
                                              "
                                              >HOLOFLIX</span
                                            ></strong
                                          ></span
                                        >
                                      </p>
                                      <p
                                        style="
                                          font-size: 14px;
                                          line-height: 140%;
                                          text-align: center;
                                        "
                                      >
                                        <span
                                          style="
                                            font-size: 34px;
                                            line-height: 47.6px;
                                            color: #000000;
                                          "
                                          ><strong
                                            ><span
                                              style="
                                                line-height: 47.6px;
                                                font-family: Raleway, sans-serif;
                                                font-size: 34px;
                                              "
                                              ><span
                                                style="
                                                  line-height: 47.6px;
                                                  font-size: 34px;
                                                "
                                                >HOLOFLIX and Chill.</span
                                              ></span
                                            ></strong
                                          ></span
                                        >
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
    
                            <!--[if (!mso)&(!IE)]><!-->
                          </div>
                          <!--<![endif]-->
                        </div>
                      </div>
                      <!--[if (mso)|(IE)]></td><![endif]-->
                      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                    </div>
                  </div>
                </div>
    
                <div
                  class="u-row-container"
                  style="padding: 0px; background-color: transparent"
                >
                  <div
                    class="u-row"
                    style="
                      margin: 0 auto;
                      min-width: 320px;
                      max-width: 600px;
                      overflow-wrap: break-word;
                      word-wrap: break-word;
                      word-break: break-word;
                      background-color: #ffffff;
                    "
                  >
                    <div
                      style="
                        border-collapse: collapse;
                        display: table;
                        width: 100%;
                        background-color: transparent;
                      "
                    >
                      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
    
                      <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                      <div
                        class="u-col u-col-100"
                        style="
                          max-width: 320px;
                          min-width: 600px;
                          display: table-cell;
                          vertical-align: top;
                        "
                      >
                        <div style="width: 100% !important">
                          <!--[if (!mso)&(!IE)]><!--><div
                            style="
                              padding: 0px;
                              border-top: 0px solid transparent;
                              border-left: 0px solid transparent;
                              border-right: 0px solid transparent;
                              border-bottom: 0px solid transparent;
                            "
                          ><!--<![endif]-->
                            <table
                              style="font-family: 'Open Sans', sans-serif"
                              role="presentation"
                              cellpadding="0"
                              cellspacing="0"
                              width="100%"
                              border="0"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    style="
                                      overflow-wrap: break-word;
                                      word-break: break-word;
                                      padding: 30px 10px 20px;
                                      font-family: 'Open Sans', sans-serif;
                                    "
                                    align="left"
                                  >
                                    <div
                                      class="v-text-align"
                                      style="
                                        line-height: 140%;
                                        text-align: left;
                                        word-wrap: break-word;
                                      "
                                    >
                                      <p
                                        style="
                                          font-size: 14px;
                                          line-height: 140%;
                                          text-align: center;
                                        "
                                      >
                                        <span
                                          style="
                                            font-family: Cabin, sans-serif;
                                            font-size: 14px;
                                            line-height: 19.6px;
                                          "
                                          ><strong
                                            ><span
                                              style="
                                                font-size: 22px;
                                                line-height: 30.8px;
                                                color: #000000;
                                              "
                                              >Welcome to HOLOFLIX</span
                                            ></strong
                                          ></span
                                        >
                                      </p>
                                      <p
                                        style="
                                          font-size: 14px;
                                          line-height: 140%;
                                          text-align: center;
                                        "
                                      >
                                        <span
                                          style="
                                            font-family: Cabin, sans-serif;
                                            font-size: 14px;
                                            line-height: 19.6px;
                                          "
                                          ><span
                                            style="
                                              font-size: 22px;
                                              line-height: 30.8px;
                                              color: #000000;
                                            "
                                            >Let our journey start.</span
                                          ></span
                                        >
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
    
                            <!--[if (!mso)&(!IE)]><!-->
                          </div>
                          <!--<![endif]-->
                        </div>
                      </div>
                      <!--[if (mso)|(IE)]></td><![endif]-->
                      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                    </div>
                  </div>
                </div>
    
                <div
                  class="u-row-container"
                  style="padding: 0px; background-color: transparent"
                >
                  <div
                    class="u-row"
                    style="
                      margin: 0 auto;
                      min-width: 320px;
                      max-width: 600px;
                      overflow-wrap: break-word;
                      word-wrap: break-word;
                      word-break: break-word;
                      background-color: #ffffff;
                    "
                  >
                    <div
                      style="
                        border-collapse: collapse;
                        display: table;
                        width: 100%;
                        background-color: transparent;
                      "
                    >
                      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
    
                      <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                      <div
                        class="u-col u-col-100"
                        style="
                          max-width: 320px;
                          min-width: 600px;
                          display: table-cell;
                          vertical-align: top;
                        "
                      >
                        <div style="width: 100% !important">
                          <!--[if (!mso)&(!IE)]><!--><div
                            style="
                              padding: 0px;
                              border-top: 0px solid transparent;
                              border-left: 0px solid transparent;
                              border-right: 0px solid transparent;
                              border-bottom: 0px solid transparent;
                            "
                          ><!--<![endif]-->
                            <table
                              style="font-family: 'Open Sans', sans-serif"
                              role="presentation"
                              cellpadding="0"
                              cellspacing="0"
                              width="100%"
                              border="0"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    style="
                                      overflow-wrap: break-word;
                                      word-break: break-word;
                                      padding: 10px;
                                      font-family: 'Open Sans', sans-serif;
                                    "
                                    align="left"
                                  >
                                    <table
                                      width="100%"
                                      cellpadding="0"
                                      cellspacing="0"
                                      border="0"
                                    >
                                      <tr>
                                        <td
                                          class="v-text-align"
                                          style="
                                            padding-right: 0px;
                                            padding-left: 0px;
                                          "
                                          align="center"
                                        >
                                          <img
                                            align="center"
                                            border="0"
                                            src="https://firebasestorage.googleapis.com/v0/b/holo-83a3a.appspot.com/o/image-4.jpeg?alt=media&token=b83800cd-f750-47ab-a933-fbb46898943d"
                                            alt="Image"
                                            title="Image"
                                            style="
                                              outline: none;
                                              text-decoration: none;
                                              -ms-interpolation-mode: bicubic;
                                              clear: both;
                                              display: inline-block !important;
                                              border: none;
                                              height: auto;
                                              float: none;
                                              width: 60%;
                                              max-width: 348px;
                                              border-radius: 50%;
                                            "
                                            width="348"
                                          />
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
    
                            <!--[if (!mso)&(!IE)]><!-->
                          </div>
                          <!--<![endif]-->
                        </div>
                      </div>
                      <!--[if (mso)|(IE)]></td><![endif]-->
                      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                    </div>
                  </div>
                </div>
    
                <div
                  class="u-row-container"
                  style="padding: 0px; background-color: transparent"
                >
                  <div
                    class="u-row"
                    style="
                      margin: 0 auto;
                      min-width: 320px;
                      max-width: 600px;
                      overflow-wrap: break-word;
                      word-wrap: break-word;
                      word-break: break-word;
                      background-color: #ffffff;
                    "
                  >
                    <div
                      style="
                        border-collapse: collapse;
                        display: table;
                        width: 100%;
                        background-color: transparent;
                      "
                    >
                      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
    
                      <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                      <div
                        class="u-col u-col-100"
                        style="
                          max-width: 320px;
                          min-width: 600px;
                          display: table-cell;
                          vertical-align: top;
                        "
                      >
                        <div style="width: 100% !important">
                          <!--[if (!mso)&(!IE)]><!--><div
                            style="
                              padding: 0px;
                              border-top: 0px solid transparent;
                              border-left: 0px solid transparent;
                              border-right: 0px solid transparent;
                              border-bottom: 0px solid transparent;
                            "
                          ><!--<![endif]-->
                            <table
                              style="font-family: 'Open Sans', sans-serif"
                              role="presentation"
                              cellpadding="0"
                              cellspacing="0"
                              width="100%"
                              border="0"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    style="
                                      overflow-wrap: break-word;
                                      word-break: break-word;
                                      padding: 10px 10px 2px;
                                      font-family: 'Open Sans', sans-serif;
                                    "
                                    align="left"
                                  >
                                    <div
                                      class="v-text-align"
                                      style="
                                        line-height: 140%;
                                        text-align: left;
                                        word-wrap: break-word;
                                      "
                                    >
                                      <p
                                        style="
                                          font-size: 14px;
                                          line-height: 140%;
                                          text-align: center;
                                        "
                                      >
                                        <span
                                          style="
                                            font-size: 18px;
                                            line-height: 25.2px;
                                          "
                                          ><strong
                                            ><span
                                              style="
                                                line-height: 25.2px;
                                                font-size: 18px;
                                              "
                                              >MINH TRI</span
                                            ></strong
                                          ></span
                                        >
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
    
                            <table
                              style="font-family: 'Open Sans', sans-serif"
                              role="presentation"
                              cellpadding="0"
                              cellspacing="0"
                              width="100%"
                              border="0"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    style="
                                      overflow-wrap: break-word;
                                      word-break: break-word;
                                      padding: 0px 10px 10px;
                                      font-family: 'Open Sans', sans-serif;
                                    "
                                    align="left"
                                  >
                                    <div
                                      class="v-text-align"
                                      style="
                                        line-height: 140%;
                                        text-align: left;
                                        word-wrap: break-word;
                                      "
                                    >
                                      <p
                                        style="
                                          font-size: 14px;
                                          line-height: 140%;
                                          text-align: center;
                                        "
                                      >
                                        <span
                                          style="
                                            font-size: 14px;
                                            line-height: 19.6px;
                                          "
                                          >Account Manager</span
                                        >
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
    
                            <!--[if (!mso)&(!IE)]><!-->
                          </div>
                          <!--<![endif]-->
                        </div>
                      </div>
                      <!--[if (mso)|(IE)]></td><![endif]-->
                      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                    </div>
                  </div>
                </div>
    
                <div
                  class="u-row-container"
                  style="padding: 0px; background-color: transparent"
                >
                  <div
                    class="u-row"
                    style="
                      margin: 0 auto;
                      min-width: 320px;
                      max-width: 600px;
                      overflow-wrap: break-word;
                      word-wrap: break-word;
                      word-break: break-word;
                      background-color: #ffffff;
                    "
                  >
                    <div
                      style="
                        border-collapse: collapse;
                        display: table;
                        width: 100%;
                        background-color: transparent;
                      "
                    >
                      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
    
                      <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                      <div
                        class="u-col u-col-100"
                        style="
                          max-width: 320px;
                          min-width: 600px;
                          display: table-cell;
                          vertical-align: top;
                        "
                      >
                        <div style="width: 100% !important">
                          <!--[if (!mso)&(!IE)]><!--><div
                            style="
                              padding: 0px;
                              border-top: 0px solid transparent;
                              border-left: 0px solid transparent;
                              border-right: 0px solid transparent;
                              border-bottom: 0px solid transparent;
                            "
                          ><!--<![endif]-->
                            <table
                              style="font-family: 'Open Sans', sans-serif"
                              role="presentation"
                              cellpadding="0"
                              cellspacing="0"
                              width="100%"
                              border="0"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    style="
                                      overflow-wrap: break-word;
                                      word-break: break-word;
                                      padding: 10px;
                                      font-family: 'Open Sans', sans-serif;
                                    "
                                    align="left"
                                  >
                                    <div align="center">
                                      <div style="display: table; max-width: 87px">
                                        <!--[if (mso)|(IE)]><table width="87" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:87px;"><tr><![endif]-->
    
                                        <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 12px;" valign="top"><![endif]-->
                                        <table
                                          align="left"
                                          border="0"
                                          cellspacing="0"
                                          cellpadding="0"
                                          width="32"
                                          height="32"
                                          style="
                                            border-collapse: collapse;
                                            table-layout: fixed;
                                            border-spacing: 0;
                                            mso-table-lspace: 0pt;
                                            mso-table-rspace: 0pt;
                                            vertical-align: top;
                                            margin-right: 12px;
                                          "
                                        >
                                          <tbody>
                                            <tr style="vertical-align: top">
                                              <td
                                                align="left"
                                                valign="middle"
                                                style="
                                                  word-break: break-word;
                                                  border-collapse: collapse !important;
                                                  vertical-align: top;
                                                "
                                              >
                                                <a
                                                  href="https://facebook.com/violetevergarden"
                                                  title="Facebook"
                                                  target="_blank"
                                                >
                                                  <img
                                                    src="https://firebasestorage.googleapis.com/v0/b/holo-83a3a.appspot.com/o/image-1.png?alt=media&token=f2be26f5-1403-4cc3-8ee1-2ff44c9ceddd"
                                                    alt="Facebook"
                                                    title="Facebook"
                                                    width="32"
                                                    style="
                                                      outline: none;
                                                      text-decoration: none;
                                                      -ms-interpolation-mode: bicubic;
                                                      clear: both;
                                                      display: block !important;
                                                      border: none;
                                                      height: auto;
                                                      float: none;
                                                      max-width: 32px !important;
                                                    "
                                                  />
                                                </a>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                        <!--[if (mso)|(IE)]></td><![endif]-->
    
                                        <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]-->
                                        <table
                                          align="left"
                                          border="0"
                                          cellspacing="0"
                                          cellpadding="0"
                                          width="32"
                                          height="32"
                                          style="
                                            border-collapse: collapse;
                                            table-layout: fixed;
                                            border-spacing: 0;
                                            mso-table-lspace: 0pt;
                                            mso-table-rspace: 0pt;
                                            vertical-align: top;
                                            margin-right: 0px;
                                          "
                                        >
                                          <tbody>
                                            <tr style="vertical-align: top">
                                              <td
                                                align="left"
                                                valign="middle"
                                                style="
                                                  word-break: break-word;
                                                  border-collapse: collapse !important;
                                                  vertical-align: top;
                                                "
                                              >
                                                <a
                                                  href="https://github.com/minhtri06ltr"
                                                  title="GitHub"
                                                  target="_blank"
                                                >
                                                  <img
                                                    src="https://firebasestorage.googleapis.com/v0/b/holo-83a3a.appspot.com/o/image-3.png?alt=media&token=07c94b97-1d40-43e9-9091-65619a443129"
                                                    alt="GitHub"
                                                    title="GitHub"
                                                    width="32"
                                                    style="
                                                      outline: none;
                                                      text-decoration: none;
                                                      -ms-interpolation-mode: bicubic;
                                                      clear: both;
                                                      display: block !important;
                                                      border: none;
                                                      height: auto;
                                                      float: none;
                                                      max-width: 32px !important;
                                                    "
                                                  />
                                                </a>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                        <!--[if (mso)|(IE)]></td><![endif]-->
    
                                        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
    
                            <!--[if (!mso)&(!IE)]><!-->
                          </div>
                          <!--<![endif]-->
                        </div>
                      </div>
                      <!--[if (mso)|(IE)]></td><![endif]-->
                      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                    </div>
                  </div>
                </div>
    
                <div
                  class="u-row-container"
                  style="padding: 0px; background-color: transparent"
                >
                  <div
                    class="u-row"
                    style="
                      margin: 0 auto;
                      min-width: 320px;
                      max-width: 600px;
                      overflow-wrap: break-word;
                      word-wrap: break-word;
                      word-break: break-word;
                      background-color: #ffffff;
                    "
                  >
                    <div
                      style="
                        border-collapse: collapse;
                        display: table;
                        width: 100%;
                        background-color: transparent;
                      "
                    >
                      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
    
                      <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                      <div
                        class="u-col u-col-100"
                        style="
                          max-width: 320px;
                          min-width: 600px;
                          display: table-cell;
                          vertical-align: top;
                        "
                      >
                        <div style="width: 100% !important">
                          <!--[if (!mso)&(!IE)]><!--><div
                            style="
                              padding: 0px;
                              border-top: 0px solid transparent;
                              border-left: 0px solid transparent;
                              border-right: 0px solid transparent;
                              border-bottom: 0px solid transparent;
                            "
                          ><!--<![endif]-->
                            <table
                              style="font-family: 'Open Sans', sans-serif"
                              role="presentation"
                              cellpadding="0"
                              cellspacing="0"
                              width="100%"
                              border="0"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    style="
                                      overflow-wrap: break-word;
                                      word-break: break-word;
                                      padding: 10px 33px 15px;
                                      font-family: 'Open Sans', sans-serif;
                                    "
                                    align="left"
                                  >
                                    <div
                                      class="v-text-align"
                                      style="
                                        line-height: 140%;
                                        text-align: left;
                                        word-wrap: break-word;
                                      "
                                    >
                                      <p
                                        style="
                                          font-size: 14px;
                                          line-height: 140%;
                                          text-align: center;
                                        "
                                      >
                                        <span
                                          style="
                                            font-family: Cabin, sans-serif;
                                            font-size: 16px;
                                            line-height: 22.4px;
                                          "
                                          >Click button below to validate your
                                          email</span
                                        >
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
    
                            <!--[if (!mso)&(!IE)]><!-->
                          </div>
                          <!--<![endif]-->
                        </div>
                      </div>
                      <!--[if (mso)|(IE)]></td><![endif]-->
                      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                    </div>
                  </div>
                </div>
    
                <div
                  class="u-row-container"
                  style="padding: 0px; background-color: transparent"
                >
                  <div
                    class="u-row"
                    style="
                      margin: 0 auto;
                      min-width: 320px;
                      max-width: 600px;
                      overflow-wrap: break-word;
                      word-wrap: break-word;
                      word-break: break-word;
                      background-color: #ffffff;
                    "
                  >
                    <div
                      style="
                        border-collapse: collapse;
                        display: table;
                        width: 100%;
                        background-color: transparent;
                      "
                    >
                      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
    
                      <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                      <div
                        class="u-col u-col-100"
                        style="
                          max-width: 320px;
                          min-width: 600px;
                          display: table-cell;
                          vertical-align: top;
                        "
                      >
                        <div style="width: 100% !important">
                          <!--[if (!mso)&(!IE)]><!--><div
                            style="
                              padding: 0px;
                              border-top: 0px solid transparent;
                              border-left: 0px solid transparent;
                              border-right: 0px solid transparent;
                              border-bottom: 0px solid transparent;
                            "
                          ><!--<![endif]-->
                            <table
                              style="font-family: 'Open Sans', sans-serif"
                              role="presentation"
                              cellpadding="0"
                              cellspacing="0"
                              width="100%"
                              border="0"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    style="
                                      overflow-wrap: break-word;
                                      word-break: break-word;
                                      padding: 10px 10px 50px;
                                      font-family: 'Open Sans', sans-serif;
                                    "
                                    align="left"
                                  >
                                    <div class="v-text-align" align="center">
                                      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;font-family:'Open Sans',sans-serif;"><tr><td class="v-text-align" style="font-family:'Open Sans',sans-serif;" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:47px; v-text-anchor:middle; width:101px;" arcsize="40.5%" stroke="f" fillcolor="#1c4079"><w:anchorlock/><center style="color:#FFFFFF;font-family:'Open Sans',sans-serif;"><![endif]-->
                                      <a
                                        href=${url}
                                        target="_blank"
                                        style="
                                          box-sizing: border-box;
                                          display: inline-block;
                                          font-family: 'Open Sans', sans-serif;
                                          text-decoration: none;
                                          -webkit-text-size-adjust: none;
                                          text-align: center;
                                          color: #ffffff;
                                          background-color: #1c4079;
                                          border-radius: 19px;
                                          -webkit-border-radius: 19px;
                                          -moz-border-radius: 19px;
                                          width: auto;
                                          max-width: 100%;
                                          overflow-wrap: break-word;
                                          word-break: break-word;
                                          word-wrap: break-word;
                                          mso-border-alt: none;
                                        "
                                      >
                                        <span
                                          style="
                                            display: block;
                                            padding: 13px 24px 12px;
                                            line-height: 120%;
                                          "
                                          ><span
                                            style="
                                              font-size: 18px;
                                              line-height: 21.6px;
                                              font-family: 'Open Sans', sans-serif;
                                            "
                                            ><strong
                                              ><span
                                                style="
                                                  line-height: 21.6px;
                                                  font-size: 18px;
                                                "
                                                >Verify</span
                                                
                                              ></strong
                                            ></span
                                          ></span
                                        >
                                      </a>
                                      <!--[if mso]></center></v:roundrect></td></tr></table><![endif]-->
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
    
                            <!--[if (!mso)&(!IE)]><!-->
                          </div>
                          <!--<![endif]-->
                        </div>
                      </div>
                      <!--[if (mso)|(IE)]></td><![endif]-->
                      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                    </div>
                  </div>
                </div>
    
                <div
                  class="u-row-container"
                  style="padding: 0px; background-color: transparent"
                >
                  <div
                    class="u-row"
                    style="
                      margin: 0 auto;
                      min-width: 320px;
                      max-width: 600px;
                      overflow-wrap: break-word;
                      word-wrap: break-word;
                      word-break: break-word;
                      background-color: #2d529d;
                    "
                  >
                    <div
                      style="
                        border-collapse: collapse;
                        display: table;
                        width: 100%;
                        background-color: transparent;
                      "
                    >
                      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #2d529d;"><![endif]-->
    
                      <!--[if (mso)|(IE)]><td align="center" width="300" style="width: 300px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                      <div
                        class="u-col u-col-50"
                        style="
                          max-width: 320px;
                          min-width: 300px;
                          display: table-cell;
                          vertical-align: top;
                        "
                      >
                        <div style="width: 100% !important">
                          <!--[if (!mso)&(!IE)]><!--><div
                            style="
                              padding: 0px;
                              border-top: 0px solid transparent;
                              border-left: 0px solid transparent;
                              border-right: 0px solid transparent;
                              border-bottom: 0px solid transparent;
                            "
                          ><!--<![endif]-->
                            <table
                              id="u_content_text_7"
                              style="font-family: 'Open Sans', sans-serif"
                              role="presentation"
                              cellpadding="0"
                              cellspacing="0"
                              width="100%"
                              border="0"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    style="
                                      overflow-wrap: break-word;
                                      word-break: break-word;
                                      padding: 23px 60px 20px;
                                      font-family: 'Open Sans', sans-serif;
                                    "
                                    align="left"
                                  >
                                    <div
                                      class="v-text-align"
                                      style="
                                        line-height: 160%;
                                        text-align: left;
                                        word-wrap: break-word;
                                      "
                                    >
                                      <p style="font-size: 14px; line-height: 160%">
                                        <span
                                          style="
                                            font-family: 'Open Sans', sans-serif;
                                            font-size: 14px;
                                            line-height: 22.4px;
                                          "
                                          ><strong
                                            ><span
                                              style="
                                                line-height: 22.4px;
                                                color: #ffffff;
                                                font-size: 14px;
                                              "
                                              >Respectfully,</span
                                            ></strong
                                          ></span
                                        >
                                      </p>
                                      <p style="font-size: 14px; line-height: 160%">
                                        <span
                                          style="
                                            font-size: 14px;
                                            line-height: 22.4px;
                                            font-family: 'Open Sans', sans-serif;
                                            color: #ffffff;
                                          "
                                          >MINH TRI</span
                                        >
                                      </p>
                                      <p style="font-size: 14px; line-height: 160%">
                                        <span
                                          style="
                                            font-size: 14px;
                                            line-height: 22.4px;
                                            font-family: 'Open Sans', sans-serif;
                                            color: #ffffff;
                                          "
                                          >HOLOFLIX Development</span
                                        >
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
    
                            <!--[if (!mso)&(!IE)]><!-->
                          </div>
                          <!--<![endif]-->
                        </div>
                      </div>
                      <!--[if (mso)|(IE)]></td><![endif]-->
                      <!--[if (mso)|(IE)]><td align="center" width="300" style="width: 300px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                      <div
                        class="u-col u-col-50"
                        style="
                          max-width: 320px;
                          min-width: 300px;
                          display: table-cell;
                          vertical-align: top;
                        "
                      >
                        <div style="width: 100% !important">
                          <!--[if (!mso)&(!IE)]><!--><div
                            style="
                              padding: 0px;
                              border-top: 0px solid transparent;
                              border-left: 0px solid transparent;
                              border-right: 0px solid transparent;
                              border-bottom: 0px solid transparent;
                            "
                          ><!--<![endif]-->
                            <table
                              style="font-family: 'Open Sans', sans-serif"
                              role="presentation"
                              cellpadding="0"
                              cellspacing="0"
                              width="100%"
                              border="0"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    style="
                                      overflow-wrap: break-word;
                                      word-break: break-word;
                                      padding: 25px 10px 10px;
                                      font-family: 'Open Sans', sans-serif;
                                    "
                                    align="left"
                                  >
                                    <div align="center">
                                      <div style="display: table; max-width: 89px">
                                        <!--[if (mso)|(IE)]><table width="89" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:89px;"><tr><![endif]-->
    
                                        <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 13px;" valign="top"><![endif]-->
                                        <table
                                          align="left"
                                          border="0"
                                          cellspacing="0"
                                          cellpadding="0"
                                          width="32"
                                          height="32"
                                          style="
                                            border-collapse: collapse;
                                            table-layout: fixed;
                                            border-spacing: 0;
                                            mso-table-lspace: 0pt;
                                            mso-table-rspace: 0pt;
                                            vertical-align: top;
                                            margin-right: 13px;
                                          "
                                        >
                                          <tbody>
                                            <tr style="vertical-align: top">
                                              <td
                                                align="left"
                                                valign="middle"
                                                style="
                                                  word-break: break-word;
                                                  border-collapse: collapse !important;
                                                  vertical-align: top;
                                                "
                                              >
                                                <a
                                                  href="https://facebook.com/violetevergarden"
                                                  title="Facebook"
                                                  target="_blank"
                                                >
                                                  <img
                                                    src="https://firebasestorage.googleapis.com/v0/b/holo-83a3a.appspot.com/o/image-2.png?alt=media&token=224800bf-b92a-48b5-b406-082c698aff7c"
                                                    alt="Facebook"
                                                    title="Facebook"
                                                    width="32"
                                                    style="
                                                      outline: none;
                                                      text-decoration: none;
                                                      -ms-interpolation-mode: bicubic;
                                                      clear: both;
                                                      display: block !important;
                                                      border: none;
                                                      height: auto;
                                                      float: none;
                                                      max-width: 32px !important;
                                                    "
                                                  />
                                                </a>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                        <!--[if (mso)|(IE)]></td><![endif]-->
    
                                        <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]-->
                                        <table
                                          align="left"
                                          border="0"
                                          cellspacing="0"
                                          cellpadding="0"
                                          width="32"
                                          height="32"
                                          style="
                                            border-collapse: collapse;
                                            table-layout: fixed;
                                            border-spacing: 0;
                                            mso-table-lspace: 0pt;
                                            mso-table-rspace: 0pt;
                                            vertical-align: top;
                                            margin-right: 0px;
                                          "
                                        >
                                          <tbody>
                                            <tr style="vertical-align: top">
                                              <td
                                                align="left"
                                                valign="middle"
                                                style="
                                                  word-break: break-word;
                                                  border-collapse: collapse !important;
                                                  vertical-align: top;
                                                "
                                              >
                                                <a
                                                  href="https://github.com/minhtri06lt"
                                                  title="GitHub"
                                                  target="_blank"
                                                >
                                                  <img
                                                    src="https://firebasestorage.googleapis.com/v0/b/holo-83a3a.appspot.com/o/image-5.png?alt=media&token=b27df6d8-ecf6-40e9-9c05-0435b2549746"
                                                    alt="GitHub"
                                                    title="GitHub"
                                                    width="32"
                                                    style="
                                                      outline: none;
                                                      text-decoration: none;
                                                      -ms-interpolation-mode: bicubic;
                                                      clear: both;
                                                      display: block !important;
                                                      border: none;
                                                      height: auto;
                                                      float: none;
                                                      max-width: 32px !important;
                                                    "
                                                  />
                                                </a>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                        <!--[if (mso)|(IE)]></td><![endif]-->
    
                                        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
    
                            <table
                              id="u_content_text_8"
                              style="font-family: 'Open Sans', sans-serif"
                              role="presentation"
                              cellpadding="0"
                              cellspacing="0"
                              width="100%"
                              border="0"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    style="
                                      overflow-wrap: break-word;
                                      word-break: break-word;
                                      padding: 5px 10px 20px;
                                      font-family: 'Open Sans', sans-serif;
                                    "
                                    align="left"
                                  >
                                    <div
                                      class="v-text-align"
                                      style="
                                        line-height: 140%;
                                        text-align: center;
                                        word-wrap: break-word;
                                      "
                                    >
                                      <p
                                        style="
                                          font-size: 14px;
                                          line-height: 140%;
                                          text-align: center;
                                        "
                                      >
                                        <span
                                          style="
                                            font-size: 14px;
                                            line-height: 19.6px;
                                            color: #ffffff;
                                          "
                                          >laptopdienthoai1&#64;gmail&#46;&#65279;com</span
                                        >
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
    
                            <!--[if (!mso)&(!IE)]><!-->
                          </div>
                          <!--<![endif]-->
                        </div>
                      </div>
                      <!--[if (mso)|(IE)]></td><![endif]-->
                      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                    </div>
                  </div>
                </div>
    
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
        <!--[if mso]></div><![endif]-->
        <!--[if IE]></div><![endif]-->
      </body>
    </html>
    `
        : `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
    <!--[if gte mso 9]>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="x-apple-disable-message-reformatting">
      <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
      <title></title>
      
        <style type="text/css">
          table, td { color: #000000; } a { color: #0000ee; text-decoration: underline; }
    @media only screen and (min-width: 620px) {
      .u-row {
        width: 600px !important;
      }
      .u-row .u-col {
        vertical-align: top;
      }
    
      .u-row .u-col-100 {
        width: 600px !important;
      }
    
    }
    
    @media (max-width: 620px) {
      .u-row-container {
        max-width: 100% !important;
        padding-left: 0px !important;
        padding-right: 0px !important;
      }
      .u-row .u-col {
        min-width: 320px !important;
        max-width: 100% !important;
        display: block !important;
      }
      .u-row {
        width: calc(100% - 40px) !important;
      }
      .u-col {
        width: 100% !important;
      }
      .u-col > div {
        margin: 0 auto;
      }
    }
    body {
      margin: 0;
      padding: 0;
    }
    
    table,
    tr,
    td {
      vertical-align: top;
      border-collapse: collapse;
    }
    
    p {
      margin: 0;
    }
    
    .ie-container table,
    .mso-container table {
      table-layout: fixed;
    }
    
    * {
      line-height: inherit;
    }
    
    a[x-apple-data-detectors='true'] {
      color: inherit !important;
      text-decoration: none !important;
    }
    
    </style>
      
      
    
    <!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Cabin:400,700&display=swap" rel="stylesheet" type="text/css"><!--<![endif]-->
    
    </head>
    
    <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #ffffff;color: #000000">
      <!--[if IE]><div class="ie-container"><![endif]-->
      <!--[if mso]><div class="mso-container"><![endif]-->
      <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #ffffff;width:100%" cellpadding="0" cellspacing="0">
      <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #ffffff;"><![endif]-->
        
    
    <div class="u-row-container" style="padding: 0px;background-color: transparent">
      <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #f4f5f4;">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #f4f5f4;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
      <div style="width: 100% !important;">
      <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
      
    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:30px 10px;font-family:arial,helvetica,sans-serif;" align="left">
            
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="padding-right: 0px;padding-left: 0px;" align="center">
          
          <img align="center" border="0" src="https://upload.wikimedia.org/wikipedia/commons/9/95/Hololive_Production.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 27%;max-width: 156.6px;" width="156.6"/>
          
        </td>
      </tr>
    </table>
    
          </td>
        </tr>
      </tbody>
    </table>
    
      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
    </div>
    
    
    
    <div class="u-row-container" style="padding: 0px;background-color: transparent">
      <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
      <div style="width: 100% !important;">
      <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
      
    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:arial,helvetica,sans-serif;" align="left">
            
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="padding-right: 0px;padding-left: 0px;" align="center">
          
          <img align="center" border="0" src="https://i.pinimg.com/originals/2a/0a/2a/2a0a2a1021e29f96173e35bc17f5b326.gif" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 498px;" width="498"/>
          
        </td>
      </tr>
    </table>
    
          </td>
        </tr>
      </tbody>
    </table>
    
      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
    </div>
    
    
    
    <div class="u-row-container" style="padding: 0px;background-color: transparent">
      <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
      <div style="width: 100% !important;">
      <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
      
    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:20px 20px 10px;font-family:arial,helvetica,sans-serif;" align="left">
            
      <div style="line-height: 170%; text-align: left; word-wrap: break-word;">
        <p style="font-size: 14px; line-height: 170%; text-align: center;"><span style="font-size: 18px; line-height: 30.6px; font-family: 'comic sans ms', sans-serif; color: #6f9854;">Please be more carefull on your password</span></p>
    <p style="font-size: 14px; line-height: 170%; text-align: center;"><span style="font-size: 18px; line-height: 30.6px; font-family: 'comic sans ms', sans-serif; color: #6f9854;">Have a nice day!</span></p>
    <p style="font-size: 14px; line-height: 170%; text-align: center;"><span style="font-size: 18px; line-height: 30.6px; font-family: 'comic sans ms', sans-serif; color: #6f9854;">Click button below to reset your password</span></p>
      </div>
    
          </td>
        </tr>
      </tbody>
    </table>
    
      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
    </div>
    
    
    
    <div class="u-row-container" style="padding: 0px;background-color: transparent">
      <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
      <div style="width: 100% !important;">
      <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
      
    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:9px;font-family:arial,helvetica,sans-serif;" align="left">
            
      <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 0px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
        <tbody>
          <tr style="vertical-align: top">
            <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
              <span>&#160;</span>
            </td>
          </tr>
        </tbody>
      </table>
    
          </td>
        </tr>
      </tbody>
    </table>
    
    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
            
    <div align="center">
      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;font-family:arial,helvetica,sans-serif;"><tr><td style="font-family:arial,helvetica,sans-serif;" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:48px; v-text-anchor:middle; width:102px;" arcsize="6.5%" stroke="f" fillcolor="#6f9854"><w:anchorlock/><center style="color:#FFFFFF;font-family:arial,helvetica,sans-serif;"><![endif]-->
        <a href="${url}" target="_blank" style="box-sizing: border-box;display: inline-block;font-family:arial,helvetica,sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #6f9854; border-radius: 3px;-webkit-border-radius: 3px; -moz-border-radius: 3px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;">
          <span style="display:block;padding:13px 30px;line-height:120%;"><span style="font-size: 18px; line-height: 21.6px; font-family: Cabin, sans-serif;">Reset</span></span>
        </a>
      <!--[if mso]></center></v:roundrect></td></tr></table><![endif]-->
    </div>
    
          </td>
        </tr>
      </tbody>
    </table>
    
    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:12px;font-family:arial,helvetica,sans-serif;" align="left">
            
      <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 0px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
        <tbody>
          <tr style="vertical-align: top">
            <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
              <span>&#160;</span>
            </td>
          </tr>
        </tbody>
      </table>
    
          </td>
        </tr>
      </tbody>
    </table>
    
      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
    </div>
    
    
    
    <div class="u-row-container" style="padding: 0px;background-color: transparent">
      <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
      <div style="width: 100% !important;">
      <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
      
    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:9px;font-family:arial,helvetica,sans-serif;" align="left">
            
      <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 0px solid #ffffff;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
        <tbody>
          <tr style="vertical-align: top">
            <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
              <span>&#160;</span>
            </td>
          </tr>
        </tbody>
      </table>
    
          </td>
        </tr>
      </tbody>
    </table>
    
      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
    </div>
    
    
    
    <div class="u-row-container" style="padding: 0px;background-color: transparent">
      <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #293621;">
        <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #293621;"><![endif]-->
          
    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
      <div style="width: 100% !important;">
      <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
      
    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:40px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
            
    <div align="center">
      <div style="display: table; max-width:103px;">
      <!--[if (mso)|(IE)]><table width="103" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:103px;"><tr><![endif]-->
      
        
        <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 20px;" valign="top"><![endif]-->
        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 20px">
          <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            <a href="https://facebook.com/violetevergarden" title="Facebook" target="_blank">
              <img src="https://firebasestorage.googleapis.com/v0/b/holo-83a3a.appspot.com/o/image-1.png?alt=media&token=1445562a-9144-40ff-a624-3a0fc2b24cb1" alt="Facebook" title="Facebook" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
            </a>
          </td></tr>
        </tbody></table>
        <!--[if (mso)|(IE)]></td><![endif]-->
        
        <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]-->
        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
          <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
            <a href="https://github.com/minhtri06ltr" title="GitHub" target="_blank">
              <img src="https://firebasestorage.googleapis.com/v0/b/holo-83a3a.appspot.com/o/image-2.png?alt=media&token=1269181d-e648-4de7-99c7-90f9ebd9593d" alt="GitHub" title="GitHub" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
            </a>
          </td></tr>
        </tbody></table>
        <!--[if (mso)|(IE)]></td><![endif]-->
        
        
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
    
          </td>
        </tr>
      </tbody>
    </table>
    
    <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
      <tbody>
        <tr>
          <td style="overflow-wrap:break-word;word-break:break-word;padding:20px;font-family:arial,helvetica,sans-serif;" align="left">
            
      <div style="line-height: 140%; text-align: left; word-wrap: break-word;">
        <p style="font-size: 14px; line-height: 140%; text-align: center;"><span style="color: #ffffff; font-size: 14px; line-height: 19.6px; font-family: Cabin, sans-serif;">If this not your action please ignore this mail</span></p>
      </div>
    
          </td>
        </tr>
      </tbody>
    </table>
    
      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
    </div>
    <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
    </div>
    
    
        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
        </td>
      </tr>
      </tbody>
      </table>
      <!--[if mso]></div><![endif]-->
      <!--[if IE]></div><![endif]-->
    </body>
    
    </html>
    `,
  };
  smtpTransport.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      return err;
    }
    return info;
  });
};
