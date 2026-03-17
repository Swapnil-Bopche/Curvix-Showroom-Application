import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('vehicle_showroom_token')

  if (token) {
    const modifiedReq = req.clone({
      setHeaders: {
        Authorization: token
      }
    })

    return next(modifiedReq)
  }
  return next(req);
};
