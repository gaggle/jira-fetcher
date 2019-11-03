"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const assert_1 = require("assert");
describe("cli", () => {
    const args = ["--debug-use-mock-jira"];
    afterEach(() => { return args.length = 1; });
    function addArgs(...a) {
        args.push(...a);
    }
    describe("called without args", () => {
        assertExitCode(0);
        assertShowsHelp();
    });
    describe("called with help", () => {
        beforeEach(() => addArgs("--help"));
        assertExitCode(0);
        assertShowsHelp();
    });
    describe("called with invalid command", () => {
        beforeEach(() => addArgs("invalid_command"));
        assertExitCode(1);
    });
    describe("called a command (but missing server, user, token)", () => {
        beforeEach(() => addArgs("raw-issue"));
        assertExitCode(1);
    });
    describe("called with server, user, token", () => {
        beforeEach(() => addArgs("--server", "foo.com", "--user", "user", "--token", "token"));
        describe("but no command", () => {
            assertExitCode(0);
            assertShowsHelp();
        });
        describe("and an invalid command", () => {
            assertExitCode(1);
            beforeEach(() => addArgs("invalid_command"));
        });
        describe("and raw-issue command", () => {
            beforeEach(() => addArgs("raw-issue"));
            assertIssueTestCases();
        });
        describe("and simple-issue command", () => {
            beforeEach(() => addArgs("simple-issue"));
            assertIssueTestCases();
        });
    });
    function assertIssueTestCases() {
        describe("but no issue", () => {
            assertExitCode(1);
            assertShowsError("missing required argument");
        });
        describe("and STORY-1", () => {
            beforeEach(() => addArgs("STORY-1"));
            assertExitCode(0);
            it("prints the issue", async () => {
                const key = "STORY-1";
                const { stdout } = await invoke();
                assert_1.ok(contains(stdout, `"key": "${key}"`), `Invoke did not print ${key}, got: ${stdout}`);
            });
        });
    }
    function assertExitCode(code) {
        if (code === 0) {
            it("exits cleanly", async () => {
                const { code } = await invoke();
                assert_1.strictEqual(code, code, "Invoke did not exit cleanly");
            });
        }
        else {
            it("exits non-zero", async () => {
                const { code } = await invokeThrows();
                assert_1.strictEqual(code, code, "Invoke did not exit with non-zero exit code");
            });
        }
    }
    function assertShowsError(msg) {
        it(`shows error '${msg}'`, async () => {
            const { message } = await invokeThrows();
            assert_1.ok(contains(message, msg), `Invoke did not fail with message '${msg}', got: ${message}`);
        });
    }
    function assertShowsHelp() {
        it("shows help", async () => {
            const { stdout } = await invoke();
            assert_1.ok(contains(stdout, "Usage:", "Options:", "Commands:", "Examples:"), `Invoke did not show help, got:\n${stdout}`);
        });
    }
    async function invoke() {
        let code;
        return new Promise((resolve, reject) => {
            const ls = child_process_1.exec(getCmd(), function (error, stdout, stderr) {
                if (error) {
                    return reject(error);
                }
                return resolve({ stdout, stderr, code });
            });
            ls.on("exit", function (_code) {
                code = _code;
            });
        });
    }
    // If invoke doesn't throw the test is marked as failed,
    // so we can guarantee the return is an error
    // eslint-disable-next-line
    // @ts-ignore
    async function invokeThrows() {
        try {
            await invoke();
        }
        catch (err) {
            return err;
        }
        assert_1.fail(`Invoke did not throw: ${getCmd()}`);
    }
    function getCmd() {
        return `/Users/gaggle/Projects/simple-jira-client/node_modules/.bin/ts-node src/cli.ts ${args.join(" ")}`;
    }
});
function contains(text, ...matches) {
    for (const match of matches) {
        if (text.indexOf(match) === -1)
            return false;
    }
    return true;
}
//# sourceMappingURL=cli.spec.js.map