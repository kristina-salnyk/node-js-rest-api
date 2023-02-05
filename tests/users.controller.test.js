require("dotenv").config();
const { getMockReq, getMockRes } = require("@jest-mock/express");
const bcrypt = require("bcrypt");
const { login } = require("../controller/users.controller");
const service = require("../service/users");

describe("User login tests", () => {
  const mockUser = {
    _id: "63ca71a151484acb4f444576",
    email: "user@example.com",
    password: "user_password",
    subscription: "pro",
  };

  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = getMockReq({
      body: {
        email: mockUser.email,
        password: mockUser.password,
      },
    });

    mockRes = getMockRes();
  });

  test("should set the token and user data in response with 200 status code, if the user is registered", async () => {
    let mockToken;

    const salt = await bcrypt.genSalt();
    const mockHashedPassword = await bcrypt.hash(mockUser.password, salt);

    jest.spyOn(service, "getUserByEmail").mockImplementationOnce(async () => ({
      _id: mockUser._id,
      password: mockHashedPassword,
    }));

    jest
      .spyOn(service, "updateUser")
      .mockImplementationOnce(async (_, { token }) => {
        mockToken = token;

        return {
          email: mockUser.email,
          subscription: mockUser.subscription,
          token,
        };
      });

    await login(mockReq, mockRes.res, mockRes.next);

    expect(mockRes.res.status).toHaveBeenCalledWith(200);
    expect(mockRes.res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        token: mockToken,
        user: {
          email: mockUser.email,
          subscription: mockUser.subscription,
        },
      })
    );
  });

  test("should set the error message in response with 401 status code, if the user is not registered", async () => {
    jest
      .spyOn(service, "getUserByEmail")
      .mockImplementationOnce(async () => null);

    jest.spyOn(service, "updateUser").mockImplementationOnce(async () => {});

    await login(mockReq, mockRes.res, mockRes.next);

    expect(mockRes.res.status).toHaveBeenCalledWith(401);
    expect(mockRes.res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Email or password is wrong",
      })
    );
  });

  test("should set the error message in response with 401 status code, if the password is invalid", async () => {
    const salt = await bcrypt.genSalt();
    const mockHashedPassword = await bcrypt.hash("invalid_password", salt);

    jest.spyOn(service, "getUserByEmail").mockImplementationOnce(async () => ({
      _id: mockUser._id,
      password: mockHashedPassword,
    }));

    jest.spyOn(service, "updateUser").mockImplementationOnce(async () => {});

    await login(mockReq, mockRes.res, mockRes.next);

    expect(mockRes.res.status).toHaveBeenCalledWith(401);
    expect(mockRes.res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Email or password is wrong",
      })
    );
  });

  test("should call next() if an exception occurred", async () => {
    jest.spyOn(service, "getUserByEmail").mockImplementationOnce(async () => {
      throw new Error();
    });

    jest.spyOn(service, "updateUser").mockImplementationOnce(async () => {});

    await login(mockReq, mockRes.res, mockRes.next);

    expect(mockRes.next).toHaveBeenCalled();
  });
});
