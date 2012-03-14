include ../../../Make.vars 

EXTRA_DIST =\
	meta.json

if PY_ENABLED
AM_CPPFLAGS += $(PYTHON_CPPFLAGS)
endif # PY_ENABLED 

pkglib_LTLIBRARIES =\
	routeflowc.la

routeflowc_la_CPPFLAGS = $(AM_CPPFLAGS) -I $(top_srcdir)/src/nox -I $(top_srcdir)/src/nox/netapps/ \
                        -I$(top_srcdir)/../common/ipc \
                        -I$(top_srcdir)/../common/utils \
			            -I$(top_srcdir)/../common/openflow \
                        -I$(top_srcdir)/../common/rftable
                        
routeflowc_la_SOURCES = routeflowc.hh routeflowc.cc
routeflowc_la_LIBADD = $(top_srcdir)/../build/lib/libipc.a $(top_srcdir)/../build/lib/librftable.a $(top_srcdir)/../build/lib/libutils.a 
routeflowc_la_LDFLAGS = -module -export-dynamic -lmongoclient

NOX_RUNTIMEFILES = meta.json	

all-local: nox-all-local
clean-local: nox-clean-local 
install-exec-hook: nox-install-local
