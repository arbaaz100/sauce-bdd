export class Credentials {
    private standardUser: string;
    private lockedOutUser: string;
    private problemUser: string;
    private performanceGlitchUser: string;
    private password: string;

    constructor() {
        this.standardUser = "standard_user";
        this.lockedOutUser = "locked_out_user";
        this.problemUser = "problem_user";
        this.performanceGlitchUser = "performance_glitch_user";
        this.password = "secret_sauce";
    }

    getStandardUser(): string {
        let user: string = this.standardUser;
        return user;
    }

    getLockedOutUser(): string {
        let user: string = this.lockedOutUser;
        return user;
    }

    getProblemUser(): string {
        let user: string = this.problemUser;
        return user;
    }

    getPerformanceGlitchUser(): string {
        let user: string = this.performanceGlitchUser;
        return user;
    }

    getPassword(): string {
        let user: string = this.password;
        return user;
    }

}
