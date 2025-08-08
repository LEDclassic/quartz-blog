---
title: 내 글 제목
lang: ko
---

터미널을 보다 효율적으로 사용하기 위한 tool이 뭐가 있을까 찾아보던 중 Tmux에 대해 알게되었다.  터미널 프로그램으로 iTerm2 사용중으로, 여기에 Tmux를 사용하면 터미널 종료 후에도 프로그램이 종료되지 않는다는 점.  그리고 여러 터미널을 동시에 띄워 놓기에 아주 용이하다는 점 등 좋아보이는 요소가 많아서 즉시 설치하게 되었다. 

생활코딩의 영상으로 Tmux의 간단한 기능 및 장점을 확인할 수 있다. 
https://youtu.be/iTyjTM4Gujg?feature=shared 


![[CleanShot 2025-08-08 at 16.15.10.png]]


reddit에서 찾은 cheatsheet wallpaper도 참고. 

![[tmux_cheatsheet.png]]


### Session vs Window vs Pane
기본적으로 Session > Window > Pane 이렇게 3단계 계층으로 되어있다.
완전히 다른 세션끼리는 화면 및 작업이 전혀 공유되지 않는다. 

Session : tmux에서 독립적으로 실행되는 작업 공간 
Window : 세션 안에서의 탭 같은 개념.  
Pane : 윈도우를 여러 칸으로 나눈 것. 

이때 window는 화면 분할이 되는 것이 아니고 화면 전체를 차지하는 단일 작업 공간으로, 그 안을 분할하는것은 Pane이 된다. 즉, 가로 세로 크기 조절 등은 pane에서만 가능한 것. 


### tmux.conf 파일 변경 

tmux를 neovim과 결합하여 사용하기 위해 필요한 코드 

1. 프리픽스(prefix) 키 변경 

```bash
unbind C-b
set-option -g prefix C-a
bind C-a send-prefix
```

prefix에 해당하는 Ctrl+b를 Ctrl+a로 바꿈.
bind C-a send prefix -> 세션 안에서 Ctrl+a를 실제 프로그램에도 보내줄 수 있게 함 


2. 패널 이동 키 바인딩 

```bash
bind h select-pane -L
bind j select-pane -D
bind k select-pane -U
bind l select-pane -R
```

prefix + h/j/k/l 로 패널 이동 가능

3. 마우스 지원
```bash
set -g mouse on
```
마우스로 패널 선택, 크기 조절, 스크롤

4. 이전 윈도우로 빠르게 전환
```bash
bind Space last-window
```
prefix + space -> 직전에 사용하던 창으로 전환

5. vim-tmux-navigator 스타일 패널 이동 
```bash
is_vim="ps -o state= -o comm= -t '#{pane_tty}' \
     | grep -iqE '^[^TXZ ]+ +(\\S+\\/)?g?(view|l?n?vim?x?|fzf)(diff)?$'"
bind-key -n 'C-h' if-shell "$is_vim" 'send-keys C-h'  'select-pane -L'
bind-key -n 'C-j' if-shell "$is_vim" 'send-keys C-j'  'select-pane -D'
bind-key -n 'C-k' if-shell "$is_vim" 'send-keys C-k'  'select-pane -U'
bind-key -n 'C-l' if-shell "$is_vim" 'send-keys C-l'  'select-pane -R'
```

맨 위의 외계어 두 줄은 '현재 tmux pane안에서 실행중인 프로그램이 vim 프로그램인지 확인해서 맞으면 is_vim=true 아니면 false" 를 준다는 조건문임. 

vim 안에서 ctrl+h/j/k/l를 누르면, vim 내부의 split 창 이동 명령이 실행됨 
vim 밖에서 같은 키를 누르면, tmux 패널 이동이 실행됨 
즉, vim과 tmux가 하나의 창처럼 자연스럽게 이동 가능 


6. 버전별 ctrl+\ 처리
```bash
tmux_version='$(tmux -V | sed -En "s/^tmux ([0-9]+(.[0-9]+)?).*/\1/p")'
if-shell -b '[ "$(echo "$tmux_version < 3.0" | bc)" = 1 ]' \
     "bind-key -n 'C-\\' if-shell \"$is_vim\" 'send-keys C-\\'  'select-pane -l'"
if-shell -b '[ "$(echo "$tmux_version >= 3.0" | bc)" = 1 ]' \
     "bind-key -n 'C-\\' if-shell \"$is_vim\" 'send-keys C-\\\\'  'select-pane -l'"
```

tmux 버전에 따라 ctrl+\ 동작을 맞춰줌 
버전별 escape 처리 방식이 달라서 분기함 

7. 복사 모드(vi)에서의 패널 이동 
```bash
bind-key -T copy-mode-vi 'C-h' select-pane -L
bind-key -T copy-mode-vi 'C-j' select-pane -D
bind-key -T copy-mode-vi 'C-k' select-pane -U
bind-key -T copy-mode-vi 'C-l' select-pane -R
bind-key -T copy-mode-vi 'C-\' select-pane -l
```

복사 모드에서도 Ctrl+h/j/k/l로 패널 이동 가능 


