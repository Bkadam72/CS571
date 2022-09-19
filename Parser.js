class Parser {
    constructor(tokens) {
        this._tokens = tokens;
        this._index = 0;
        this.lookahead = this._nextToken();
    }

    //wrapper used for crude  error recovery
    parse() {
        try {
            let result = this.parseLo();
            if (!this.check('EOF')) {
                const msg = `expecting end-of-input at "${this.lookahead.lexeme}"`;
                throw new SyntaxError(msg);
            }
            return result;
        }
        catch (err) {
            return err;
        }
    }

    check(kind) {
        return this.lookahead.kind === kind;
    }

    match(kind) {
        if (this.check(kind)) {
            this.lookahead = this._nextToken();
        }
        else {
            const msg = `expecting ${kind} at "${this.lookahead.lexeme}"`;
            throw new SyntaxError(msg);
        }
    }

    _nextToken() {
        if (this._index < this._tokens.length) {
            return this._tokens[this._index++];
        }
        else {
            return new Token('EOF', '<EOF>');
        }
    }
}
