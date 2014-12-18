package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeMerchandiseCInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/11/17.
 */
public class MerchandiseCInfopageAction extends ActionSupport {
    private int page;
    private int limit;
    private List<TMeMerchandiseCInfo> mcdlist;
    private int rows;
    private String merchandiseCid;
    @Resource
    private BaseDAO<TMeMerchandiseCInfo> dao;

    public String Mcdlist() {
        if (null != merchandiseCid) {
            mcdlist = dao.queryForPage("from TMeMerchandiseCInfo u where u.merchandiseCid like \'%" + merchandiseCid + "%\'", page, limit);
            rows = mcdlist.size();
            return SUCCESS;
        } else {
            mcdlist = dao.queryForPage("from TMeMerchandiseCInfo", page, limit);
            rows = dao.listAll(TMeMerchandiseCInfo.class).size();
            return SUCCESS;
        }
    }
    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }



    public int getRows() {
        return rows;
    }

    public void setRows(int rows) {
        this.rows = rows;
    }

    public String getMerchandiseCid() {
        return merchandiseCid;
    }

    public void setMerchandiseCid(String merchandiseCid) {
        this.merchandiseCid = merchandiseCid;
    }

    public List<TMeMerchandiseCInfo> getMcdlist() {
        return mcdlist;
    }

    public void setMcdlist(List<TMeMerchandiseCInfo> mcdlist) {
        this.mcdlist = mcdlist;
    }
}
