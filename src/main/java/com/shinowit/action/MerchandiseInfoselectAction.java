package com.shinowit.action;


import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeMerchandiseInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/11/18.
 */
public class MerchandiseInfoselectAction extends ActionSupport {
    private int page;
    private int limit;
    private int rows;
    private List<TMeMerchandiseInfo> chanlist;
    private String merchandiseId;
    @Resource
    private BaseDAO<TMeMerchandiseInfo> dao;

    public String select(){
        if(null!=merchandiseId){
            chanlist = dao.queryForPage("from TMeMerchandiseInfo u where u.merchandiseId like\'%" + merchandiseId + "%\'", page, limit);
            rows = chanlist.size();
            return SUCCESS;
        }
      chanlist=dao.queryForPage("from TMeMerchandiseInfo",page,limit);
        rows=dao.listAll(TMeMerchandiseInfo.class).size();
        return SUCCESS;
    }

    public String getMerchandiseId() {
        return merchandiseId;
    }

    public void setMerchandiseId(String merchandiseId) {
        this.merchandiseId = merchandiseId;
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

    public List<TMeMerchandiseInfo> getChanlist() {
        return chanlist;
    }

    public void setChanlist(List<TMeMerchandiseInfo> chanlist) {
        this.chanlist = chanlist;
    }
}
