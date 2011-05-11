# Makefile.frag - -*- makefile -*- rules to build iauthd-c
#
# Copyright 2011 Michael Poole <mdpoole@troilus.org>
#
# Permission is hereby granted, free of charge, to any person
# obtaining a copy of this software and associated documentation files
# (the "Software"), to deal in the Software without restriction,
# including without limitation the rights to use, copy, modify, merge,
# publish, distribute, sublicense, and/or sell copies of the Software,
# and to permit persons to whom the Software is furnished to do so,
# subject to the following conditions:
#
# The above copyright notice and this permission notice shall be
# included in all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
# EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
# MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
# NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
# BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
# ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
# CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.

BUILT_SOURCES = src/git-version.c
libexec_PROGRAMS = src/iauthd-c

if HAS_GIT
.PHONY: checkversion
checkversion:
	@GIT_VERSION=`$(GIT) describe --dirty=*`; \
        [ "z$$GIT_VERSION" != "z" ] || exit 0; \
	TMPFILE=`mktemp src/git-version.c.XXXXXX` || exit 1 ; \
	echo "const char iauthd_version[] = \"$$GIT_VERSION\";" >> $$TMPFILE ; \
	if diff -q src/git-version.c $$TMPFILE >/dev/null 2>&1 ; then \
	    rm $$TMPFILE ; \
        else \
	    echo "Putting new version $$GIT_VERSION into src/git-version.c" ; \
	    rm -f src/git-version.c ; \
	    mv $$TMPFILE src/git-version.c ; \
	fi

src/git-version.c: checkversion
endif

src_iauthd_c_SOURCES = \
	src/common.h \
	src/compat.h \
	src/git-version.c \
	src/main.c \
	src/module.c src/module.h

src_iauthd_c_LDFLAGS = -export-dynamic
