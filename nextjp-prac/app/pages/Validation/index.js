import * as React from 'react';
import ReactDOM from 'react-dom';

import { ValidationGroup, Validate } from 'mui-validate';
import TextField from '@mui/material/TextField';

export default function Validation() {
    return (
        <div>
            <p>Validation</p>
            <ValidationGroup>
                <Validate name="internal key 3" regex={[/^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/, '有効なメールアドレスを入力してください']}>
                    <TextField
                        // margin="normal"
                        // regex
                        fullWidth
                        id="email"
                        label="メールアドレス"
                        name="email"
                        // autoComplete="email"
                        autoFocus
                    />
                </Validate>
            </ValidationGroup>
            {/* 新規アカウント作成時のパスワード */}
            <ValidationGroup>
                <Validate name="internal key 3" regex={[/^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i, 'パスワードは8文字以上で、半角英数字をそれぞれ１種類以上含めてください']}>
                    <TextField
                        // margin="normal"
                        // required
                        fullWidth
                        // width="20"
                        name="password"
                        label="パスワード"
                        type="password"  //ここのコメントを解除すると、●●●●●●という型式になる
                        id="password"
                        // autoComplete="current-password"
                    />
                </Validate>
            </ValidationGroup>
            {/* サインイン時のパスワード */}
        </div>
    )
}
