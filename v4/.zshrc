export NVM_DIR="$HOME/.nvm"
[ -s "$(brew --prefix nvm)/nvm.sh" ] && . "$(brew --prefix nvm)/nvm.sh"  # This loads nvm
[ -s "$(brew --prefix nvm)/etc/bash_completion.d/nvm" ] && . "$(brew --prefix nvm)/etc/bash_completion.d/nvm"  # This loads nvm bash_completion


alias python=python3
alias pip=pip3

export PATH="/Library/Frameworks/Python.framework/Versions/3.11/lib/python3.11/site-packages:$PATH"
export PATH="/Users/hemang/miniconda3/bin/python3:$PATH"
export PATH="/Users/hemang/miniconda3/bin/pip3:$PATH"

# >>> conda initialize >>>
# !! Contents within this block are managed by 'conda init' !!
__conda_setup="$('/Users/hemang/miniconda3/bin/conda' 'shell.zsh' 'hook' 2> /dev/null)"
if [ $? -eq 0 ]; then
    eval "$__conda_setup"
else
    if [ -f "/Users/hemang/miniconda3/etc/profile.d/conda.sh" ]; then
        . "/Users/hemang/miniconda3/etc/profile.d/conda.sh"
    else
        export PATH="/Users/hemang/miniconda3/bin:$PATH"
    fi
fi
unset __conda_setup
# <<< conda initialize <<<

