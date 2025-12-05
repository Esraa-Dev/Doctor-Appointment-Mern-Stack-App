export const AsyncHandler = (CtrFunc) => {
  return function (req, res, next) {
    Promise.resolve(CtrFunc(req, res, next)).catch((err) => next(err));
  };
};
