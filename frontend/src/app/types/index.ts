export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type AuthLogin = {
  token: string;
  data: {
    customer: {
      firstName: string;
      lastName: string;
      phone: string;
      email: string;
      address: string;
    };
  };
  statusCode: number;
  message: string;
};

export type Toast = {
  id: number;
  title: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  message?: string;
  duration?: number;
  showCloseButton?: boolean;
};
