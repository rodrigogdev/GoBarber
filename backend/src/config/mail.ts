interface IMailConfig {
  driver: "ethereal" | "ses";

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}
export default {
  driver: process.env.MAIL_DRIVER || "ethereal",

  defaults: {
    from: {
      email: "contact@rodrigogdev.com",
      name: "Rodrigo Gonçalves",
    },
  },
} as IMailConfig;
