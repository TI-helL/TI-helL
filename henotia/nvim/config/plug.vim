if has("nvim")
  let g:plug_home = stdpath('data') . '/plugged'
endif

call plug#begin()

Plug 'tpope/vim-fugitive'
Plug 'tpope/vim-rhubarb'
Plug 'cohama/lexima.vim'

if has("nvim")
  " LSP for typescript
  Plug 'neovim/nvim-lspconfig'
  " lspsaga.nvim
  Plug 'glepnir/lspsaga.nvim'
  " nvim-treesitter
  Plug 'nvim-treesitter/nvim-treesitter', {'do': ':TSUpdate'}
  " completion-nvim
  Plug 'nvim-lua/completion-nvim'
  " telescope.nvim
  Plug 'nvim-lua/plenary.nvim'
  Plug 'nvim-telescope/telescope.nvim'
  " Custom File Icon
  Plug 'kyazdani42/nvim-web-devicons'
  " lualine.nvim
  Plug 'hoob3rt/lualine.nvim'
endif

call plug#end()
