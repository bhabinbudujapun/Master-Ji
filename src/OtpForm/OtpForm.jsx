import "./StyleOtpForm.css";
import chai from "../images/chai.png";

function OtpForm() {
  return (
    <div>
      <h1 className="flex items-center justify-center text-5xl font-bold text-white mt-8">
        Chai aur Code
      </h1>
      <div className="relative flex flex-col justify-center overflow-hidden py-6">
        <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl">
                <p>Mobile Phone Verification</p>
              </div>
              <div className="flex flex-row text-sm font-medium text-gray-400">
                <p>
                  Enter the 4-digit verification code that was sent to your
                  phone number.
                </p>
              </div>
            </div>

            <div>
              <form action="" method="">
                <div className="flex flex-col space-y-16">
                  <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                    <div className="w-16 h-16">
                      <input
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-[#DBE2EF] focus:ring-1 ring-blue-700"
                        type="text" // Changed from 'number' to 'text' to handle input validation
                        maxlength="1" // Limit input to 1 character
                        onInput={(e) => {
                          e.target.value = e.target.value.replace(
                            /[^0-9]/g,
                            ""
                          ); // Allow only digits
                        }}
                      />
                    </div>
                    <div className="w-16 h-16">
                      <input
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-[#DBE2EF] focus:ring-1 ring-blue-700"
                        type="text" // Changed from 'number' to 'text' to handle input validation
                        maxlength="1" // Limit input to 1 character
                        onInput={(e) => {
                          e.target.value = e.target.value.replace(
                            /[^0-9]/g,
                            ""
                          ); // Allow only digits
                        }}
                      />
                    </div>
                    <div className="w-16 h-16">
                      <input
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-[#DBE2EF] focus:ring-1 ring-blue-700"
                        type="text" // Changed from 'number' to 'text' to handle input validation
                        maxlength="1" // Limit input to 1 character
                        onInput={(e) => {
                          e.target.value = e.target.value.replace(
                            /[^0-9]/g,
                            ""
                          ); // Allow only digits
                        }}
                      />
                    </div>
                    <div className="w-16 h-16">
                      <input
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-[#DBE2EF] focus:ring-1 ring-blue-700"
                        type="text" // Changed from 'number' to 'text' to handle input validation
                        maxlength="1" // Limit input to 1 character
                        onInput={(e) => {
                          e.target.value = e.target.value.replace(
                            /[^0-9]/g,
                            ""
                          ); // Allow only digits
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col space-y-5">
                    <div>
                      <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-[#112D4E] border-none text-white text-sm shadow-sm">
                        Verify Account
                      </button>
                    </div>

                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                      <p>Didn't recieve code?</p>{" "}
                      <a
                        className="flex flex-row items-center text-blue-600"
                        rel="noopener noreferrer">
                        Resend
                      </a>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-end mx-5">
        <img src={chai} alt="chai" className="w-20 rounded-md	" />
      </div>
    </div>
  );
}

export default OtpForm;
