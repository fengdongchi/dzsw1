package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TBaMembeAddrInfo;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/12/1.
 */
public class MembeAddrInfoselectAction extends ActionSupport{
    private int page;
    private int limit;
    private int rows;
    private List<TBaMembeAddrInfo> memaddlist;
    private String id;
    @Resource
    private BaseDAO<TBaMembeAddrInfo> dao;

    public String select(){
        if(id!=null){
            memaddlist=dao.queryForPage("from TBaMembeAddrInfo a where a.id like \'%" + id + "%\'", page, limit);
            rows=memaddlist.size();
            return SUCCESS;
        }
        memaddlist=dao.queryForPage("from TBaMembeAddrInfo",page,limit);
        rows=dao.queryRecordCount("select count(*) from TBaMembeAddrInfo");
        return SUCCESS;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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


}
