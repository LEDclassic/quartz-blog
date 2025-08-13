
"set leader
unmap <Space>

" Have j and k navigate visual lines rather than logical ones 
nmap j gj
nmap k gk

" quick scroll
nmap J <C-d>
nmap K <C-u>
nmap E 5e
nmap W 5w
nmap B 5b

" I like using H and L for beginning/end of Line
nmap H ^
nmap L $
" Quicly remove search highlights
nmap <F9> :nohl<CR>

"Yank to system clipboard
set clipboard=unnamed

" Go back and forward with Ctrl+O and Ctrl+I
" (make sure to remove default Obsidian shortcusts for these to work)
exmap back obcommand app:go-back
nmap <C-o> :back<CR>
exmap forward obcommand app:go-forward
nmap <C-i> :forward<CR>

"split
exmap vsp obcommand workspace:split-vertical
exmap sp obcommand workspace:split-horizontal
nmap <Space>sv :vsp<CR>
nmap <Space>sh :sp<CR>

"workspace
exmap close-others obcommand workspace:close-others
exmap close-window obcommand workspace:close-window
exmap close-pane obcommand workspace:close
nmap <Space>ox :close-others<CR>
nmap <Space>wx :close-window<CR>
nmap <Space>x :close-pane<CR>


"toggle left sidebar
exmap lside obcommand app:toggle-left-sidebar
nmap <C-n> :lside<CR>
exmap revealFile obcommand file-explorer:reveal-active-file
nmap <Space>gf :revealFile<CR>

"surround, pasteinto(for hyperlink)
exmap surround_double_quotes surround " "
map s" :surround_double_quotes

map <A-p> :pasteinto

"tabstop 
set tabstop=4

"delete new file
exmap delete-new-file obcommand app:delete-file
nmap <Space>q :delete-new-file<CR>


